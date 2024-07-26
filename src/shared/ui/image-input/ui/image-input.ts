import { Block } from "shared/constructors";
import { InputBasic } from "../../input/ui/input-basic/input-basic";
import styles from "./image-input.module.scss";

type ImageInputProps = {
  imageSrc: string;
  imageClassName?: string;
  onChange: (file: File) => void;
};

export class ImageInput extends Block {
  constructor(props: ImageInputProps) {
    const { imageSrc, imageClassName, onChange } = props;

    super({
      imageSrc,
      imageClassName,
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
        <p class="${styles.changeOverlay}">Поменять аватар</p>
        {{{ FileInput }}}
      </label>
    `;
  }
}
