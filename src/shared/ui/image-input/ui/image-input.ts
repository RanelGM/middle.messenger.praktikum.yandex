import { Block } from "shared/constructors";
import { InputBasic } from "../../input/ui/input-basic/input-basic";
import styles from "./image-input.module.scss";

type ImageInputProps = {
  imageSrc: string;
  imageClassName?: string;
  changeOverlayClassName?: string;
  onChange: (file: File) => void;
};

export class ImageInput extends Block {
  constructor(props: ImageInputProps) {
    const { imageSrc, imageClassName, changeOverlayClassName, onChange } = props;

    super({
      imageSrc,
      imageClassName,
      changeOverlayClassName,
      FileInput: new InputBasic({
        type: "file",
        classNameInput: "visually-hidden",
        accept: "image/jpeg, image/jpg, image/png, image/gif, image/webp",
        onChange: (evt) => {
          const [file] = evt.target.files ?? [];

          if (file) {
            onChange(file);
          }
        },
      }),
    });
  }

  render(): string {
    return /* HTML */ `
      <label class="${styles.imageWrapper}">
        <img
          class="${styles.image} {{#if imageClassName}}{{imageClassName}}{{/if}}"
          src="{{ imageSrc }}"
          alt="Аватар"
          width="130"
          height="130"
        />
        <p class="${styles.changeOverlay} {{#if changeOverlayClassName}}{{changeOverlayClassName}}{{/if}}">
          Поменять аватар
        </p>
        {{{ FileInput }}}
      </label>
    `;
  }
}
