export const PHOTOS = [
  { id: "0206", caption: "Kelowna, BC" },
  { id: "0212", caption: "Kelowna, BC" },
  { id: "0797", caption: "Plane spotting at YVR. Lufthansa a350-900" },
  { id: "2373", caption: "High Park" },
  { id: "2444", caption: "My bike - a Giant Contend AR 1" },
  { id: "2611", caption: "Chengdu, China" },
  { id: "2718", caption: "My cat Mocha!" },
  { id: "2722", caption: "My cat Hulk!" },
  { id: "3039", caption: "Kelowna, BC" },
  { id: "3181", caption: "Riverdale park east" },
  { id: "4392", caption: "Flight to China on an Air Canada 777-300ER" },
];

export const FULL_IMAGE_EXT = {
  "0797": "webp",
};

export const defaultSlices = PHOTOS.map(({ id, caption }) => ({
  image: `/photos/optimized/IMG_${id}.${FULL_IMAGE_EXT[id] || "jpg"}`,
  previewImage: `/photos/optimized/thumbs/IMG_${id}.webp`,
  caption: caption || `Phone photo · IMG_${id}`,
  position: "50% 50%",
}));
