import { ApiRoutes } from "shared/constants";

const DefaultImageSrc = "/media/profile-avatar.svg";

export const getImageSrc = (src: string | undefined | null): string => {
  return src ? `${ApiRoutes.BaseUrl}/${ApiRoutes.ResourcesUrl}${src}` : DefaultImageSrc;
};
