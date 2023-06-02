import Image from "next/image";

const Avatar = ({
  imageUrl,
  classes,
  imgSize,
}: {
  imageUrl: string;
  classes?: string;
  imgSize?: string;
}) => {
  return (
    <div
      className={`${classes} relative flex items-center justify-center rounded-lg border border-[#3A0B99] bg-white p-4 text-xl font-semibold text-white `}
    >
      <Image
        src={
          imageUrl
            ? imageUrl
            : "https://res.cloudinary.com/dtkjg8f0n/image/upload/e_sharpen:100,q_auto/v1621633003/sample.webp"
        }
        alt={"User image"}
        fill
        style={{ objectFit: "cover" }}
        className={`rounded-lg ${imgSize}`}
      />
    </div>
  );
};

export default Avatar;
