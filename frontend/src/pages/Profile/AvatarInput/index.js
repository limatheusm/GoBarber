import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useField } from "@rocketseat/unform";

import api from "~/services/api";
import { Container } from "./styles";

const PLACEHOLDER = "https://api.adorable.io/avatars/100/abott@adorable.png";

export default function AvatarInput({ name }) {
  const { fieldName, registerField, defaultValue } = useField("avatar");
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: "dataset.file"
      });
    }
  }, [ref.current, fieldName]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    const avatar = e.target.files[0];

    data.append("file", avatar);
    const response = await api.post("files", data);

    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor={name}>
        <img src={preview || PLACEHOLDER} alt="Avatar" />
        <input
          type="file"
          id={name}
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired
};
