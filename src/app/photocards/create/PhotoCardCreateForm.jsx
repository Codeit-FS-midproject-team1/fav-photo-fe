"use client";

import { useRef, useState } from "react";
import Image from "next/image.js";
import Field from "@/components/field/Field";
import Icon from "@/components/icon/Icon.jsx";
import * as styles from "./PhotoCardCreateForm.css.js";

const initialForm = {
  name: "",
  method: "",
  genre: "",
  price: "1",
  totalQuantity: "1",
  description: "",
};

export default function PhotoCardCreateForm() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((previous) => ({
      ...previous,
      image: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!image) {
      nextErrors.image = "사진을 업로드해 주세요.";
    }

    if (!form.name.trim()) {
      nextErrors.name = "포토카드 이름을 입력해 주세요.";
    } else if (form.name.length > 15) {
      nextErrors.name = "포토카드 이름은 최대 15자까지 입력 가능합니다.";
    }

    if (!form.method) {
      nextErrors.method = "제작방식을 선택해 주세요.";
    }

    if (!form.genre) {
      nextErrors.genre = "장르를 선택해 주세요.";
    }

    if (!form.price) {
      nextErrors.price = "가격을 입력해 주세요.";
    } else if (Number(form.price) < 1 || Number(form.price) > 1000) {
      nextErrors.price = "가격은 1~1000 사이의 정수여야 합니다.";
    }

    if (!form.totalQuantity) {
      nextErrors.totalQuantity = "총 발행량을 입력해 주세요.";
    } else if (Number(form.totalQuantity) > 10) {
      nextErrors.totalQuantity = "총 발행량은 10장 이하로 선택 가능합니다.";
    }

    // 설명 필수항목 아니라 제거.
    // if (!form.description.trim()) {
    //   nextErrors.description = "포토카드 설명을 입력해 주세요.";
    // }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", form.name);
    formData.append("method", form.method);
    formData.append("genre", form.genre);
    formData.append("price", form.price);
    formData.append("totalQuantity", form.totalQuantity);
    formData.append("description", form.description);

    // todo: 백엔드 API 연결
    // const response = await fetch("/api/photo-cards", {
    //   method: "POST",
    //   body: formData,
    //   credentials: "include",
    // });
    // const result = await response.json();
    // if (!response.ok) {
    //   throw new Error(result.message);
    // }

    console.log("포토카드 생성 데이터", Object.fromEntries(formData));
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>포토카드 생성</h1>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field
            label="사진 업로드"
            htmlFor="photo-card-image"
            error={errors.image}
          >
            <div className={styles.uploadRow}>
              <div className={styles.fileNameBox}>
                {image?.name ?? "사진 업로드"}
              </div>

              <button
                type="button"
                className={styles.fileButton}
                onClick={() => fileInputRef.current?.click()}
              >
                파일 선택
              </button>

              <input
                ref={fileInputRef}
                id="photo-card-image"
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={handleImageChange}
              />
            </div>
          </Field>

          <div className={styles.previewBox}>
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="포토카드 이미지 미리보기"
                width={180}
                height={135}
                unoptimized
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.emptyPreview}>사진 미리보기</div>
            )}
          </div>

          <Field
            label="포토카드 이름"
            htmlFor="photo-card-name"
            error={errors.name}
          >
            <input
              id="photo-card-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="포토카드 이름을 입력해 주세요"
              maxLength={15}
              className={errors.name ? styles.inputError : styles.input}
            />
          </Field>

          <Field
            label="제작방식"
            htmlFor="photo-card-method"
            error={errors.method}
          >
            <div className={styles.selectWrapper}>
              <select
                id="photo-card-method"
                name="method"
                value={form.method}
                onChange={handleChange}
                className={errors.method ? styles.inputError : styles.select}
              >
                <option value="" disabled hidden>
                  제작방식을 선택해 주세요
                </option>
                <option value="PHOTO">PHOTO</option>
                <option value="CRAFT">CRAFT</option>
                <option value="AI">AI</option>
                <option value="ETC">ETC</option>
              </select>

              <span className={styles.selectIcon}>
                <Icon name="down" size={28} />
              </span>
            </div>
          </Field>

          <Field label="장르" htmlFor="photo-card-genre" error={errors.genre}>
            <div className={styles.selectWrapper}>
              <select
                id="photo-card-genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className={errors.genre ? styles.inputError : styles.select}
              >
                <option value="" disabled hidden>
                  장르를 선택해 주세요
                </option>
                <option value="LANDSCAPE">LANDSCAPE</option>
                <option value="PORTRAIT">PORTRAIT</option>
                <option value="ANIMAL">ANIMAL</option>
                <option value="PLANT">PLANT</option>
                <option value="OBJECT">OBJECT</option>
                <option value="ETC">ETC</option>
              </select>

              <span className={styles.selectIcon}>
                <Icon name="down" size={24} />
              </span>
            </div>
          </Field>

          <Field label="가격" htmlFor="photo-card-price" error={errors.price}>
            <input
              id="photo-card-price"
              name="price"
              type="number"
              min="1"
              max="1000"
              value={form.price}
              onChange={handleChange}
              placeholder="가격을 입력해 주세요"
              className={errors.price ? styles.inputError : styles.input}
            />
          </Field>

          <Field
            label="총 발행량"
            htmlFor="photo-card-quantity"
            error={errors.quantity}
          >
            <input
              id="photo-card-quantity"
              name="totalQuantity"
              type="number"
              min="1"
              max="10"
              value={form.totalQuantity}
              onChange={handleChange}
              className={errors.quantity ? styles.inputError : styles.input}
            />
          </Field>

          <Field
            label="포토카드 설명"
            htmlFor="photo-card-description"
            error={errors.description}
          >
            <textarea
              id="photo-card-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="카드 설명을 입력해 주세요"
              maxLength={200}
              className={
                errors.description ? styles.textareaError : styles.textarea
              }
            />
            <p className={styles.counter}>{form.description.length}/200</p>
          </Field>

          <button type="submit" className={styles.submitButton}>
            생성하기
          </button>
        </form>
      </section>
    </main>
  );
}
