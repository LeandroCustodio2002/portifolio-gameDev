import styles from "./ProjectPortrait.module.css";

type Props = {
  image: string;
};

export default function ProjectPortrait({
  image,
}: Props) {
  return (
    <div className={styles.portrait}>
      <img
        src={image}
        alt=""
        draggable={false}
      />
    </div>
  );
}