import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
]);
const runExecFile = promisify(execFile);

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: npm run optimize:images -- --input <dir> [options]

Options:
  --input <dir>         Source image directory (required)
  --output <dir>        Output directory (default: <input>/optimized)
  --max-width <number>  Resize width cap in pixels (default: 1600)
  --quality <number>    WebP quality 1-100 (default: 78)
  --keep-jpeg           Also emit jpg fallback files
  --delete-source       Delete original files after successful optimization

Examples:
  npm run optimize:images -- --input public/photos
  npm run optimize:images -- --input public/photos --output public/photos-web --max-width 1800 --quality 80 --keep-jpeg
  npm run optimize:images -- --input public/photos --delete-source
`);
  process.exit(0);
}

const readOption = (key, fallback) => {
  const index = args.indexOf(key);
  if (index === -1 || index + 1 >= args.length) return fallback;
  return args[index + 1];
};

const inputDir = readOption("--input", null);
const outputDir = readOption(
  "--output",
  inputDir ? path.join(inputDir, "optimized") : null
);
const maxWidth = Number(readOption("--max-width", "1600"));
const quality = Number(readOption("--quality", "78"));
const keepJpeg = args.includes("--keep-jpeg");
const deleteSource = args.includes("--delete-source");

if (!inputDir) {
  console.error("Missing required option: --input <dir>");
  process.exit(1);
}

const toAbsolute = (dirPath) =>
  path.isAbsolute(dirPath) ? dirPath : path.resolve(process.cwd(), dirPath);

const absoluteInputDir = toAbsolute(inputDir);
const absoluteOutputDir = toAbsolute(outputDir);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return [fullPath];
    })
  );
  return files.flat();
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const processImage = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(extension)) return null;

  const relative = path.relative(absoluteInputDir, filePath);
  const targetBasePath = path.join(
    absoluteOutputDir,
    relative.replace(/\.[^.]+$/, "")
  );

  await ensureDir(path.dirname(targetBasePath));

  try {
    const pipeline = sharp(filePath).rotate().resize({
      width: maxWidth,
      withoutEnlargement: true,
    });

    const webpPath = `${targetBasePath}.webp`;
    await pipeline.clone().webp({ quality }).toFile(webpPath);

    let jpegPath = null;
    if (keepJpeg) {
      jpegPath = `${targetBasePath}.jpg`;
      await pipeline
        .clone()
        .jpeg({ quality: Math.min(quality + 5, 88), mozjpeg: true })
        .toFile(jpegPath);
    }

    return { original: filePath, webpPath, jpegPath, fallback: false };
  } catch (error) {
    const jpegPath = `${targetBasePath}.jpg`;

    await runExecFile("sips", [
      "-Z",
      String(maxWidth),
      "--setProperty",
      "formatOptions",
      String(Math.max(40, Math.min(quality, 90))),
      "-s",
      "format",
      "jpeg",
      filePath,
      "--out",
      jpegPath,
    ]);

    return {
      original: filePath,
      webpPath: null,
      jpegPath,
      fallback: true,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const run = async () => {
  const stat = await fs.stat(absoluteInputDir).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    console.error(`Input directory not found: ${absoluteInputDir}`);
    process.exit(1);
  }

  await ensureDir(absoluteOutputDir);

  const files = await walk(absoluteInputDir);
  const imageFiles = files.filter((filePath) =>
    SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  if (!imageFiles.length) {
    console.log("No images found to optimize.");
    return;
  }

  const results = [];
  for (const filePath of imageFiles) {
    const result = await processImage(filePath);
    if (result) results.push(result);
  }

  console.log(`Optimized ${results.length} images.`);
  console.log(`Output: ${absoluteOutputDir}`);
  const fallbackCount = results.filter((result) => result.fallback).length;
  if (fallbackCount > 0) {
    console.log(
      `Used macOS fallback conversion for ${fallbackCount} image(s).`
    );
  }

  if (deleteSource) {
    const deletableFiles = results
      .filter((result) => Boolean(result.webpPath) || Boolean(result.jpegPath))
      .map((result) => result.original);

    for (const filePath of deletableFiles) {
      await fs.unlink(filePath);
    }

    console.log(`Deleted ${deletableFiles.length} source image(s).`);
  }
};

run().catch((error) => {
  console.error("Image optimization failed:");
  console.error(error);
  process.exit(1);
});
