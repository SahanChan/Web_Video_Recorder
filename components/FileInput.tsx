import React from "react";
import Image from "next/image";
import { icons } from "@/constants/icons";

const FIleInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => {
  return (
    <section className="file-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        accept={accept}
        onChange={onChange}
        ref={inputRef}
        hidden
      />

      {!previewUrl ? (
        <figure onClick={() => inputRef.current?.click()}>
          <Image src={icons.upload} alt="upload" width={24} height={24} />
          <p>Click to upload your {id}</p>
        </figure>
      ) : (
        <div>
          {type === "video" ? (
            <video src={previewUrl} controls />
          ) : (
            <Image src={previewUrl} alt="image" fill />
          )}
          <button type="button" onClick={onReset}>
            <Image src={icons.close} alt="close" width="16" height="16" />
          </button>
          <p>{file?.name}</p>
        </div>
      )}
    </section>
  );
};
export default FIleInput;
