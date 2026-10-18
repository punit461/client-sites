/**
 * The school's YouTube videos, as embedded on the previous site. Thumbnails
 * are local (public/images/videos); the player itself is only loaded when a
 * visitor presses play, so no YouTube cookies are set by merely visiting.
 */
export const videos = [
  { id: "2M3bTH8YRHk", title: "Environment Day celebration" },
  { id: "agjVXMXIRmM", title: "Navaratri celebration" },
  { id: "7OtM3IBD8N8", title: "Gandhi Jayanti celebration" },
  { id: "rJlO1FBVOaY", title: "International Yoga Day celebration" },
  { id: "mPEZlOE_9TQ", title: "Krishna Janmashtami celebration" },
  { id: "4XtnzsBSwso", title: "International Tigers Day celebration" },
  { id: "FEKp8PHu_-0", title: "Parents' orientation programme" },
  { id: "6V2eI-7W1mE", title: "First day at New Pratham Public School" },
  { id: "S-S_bT_WyOU", title: "Farewell Day" },
  { id: "bvU_LleMQDU", title: "Independence Day celebration" },
  { id: "3X5-wsFUuO8", title: "Sports Day celebration" },
] as const;

export type Video = (typeof videos)[number];
