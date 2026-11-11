"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import Field from "@/components/field/Field";
import Icon from "@/components/icon/Icon.jsx";
import * as styles from "./PhotoCardCreateForm.css.js";
import { createPhotoCard } from "@/lib/api/photoCards.js";
import { api, ApiError } from "@/lib/api.js";
import { useAuth } from "@/contexts/AuthContext.jsx";

const initialForm = {
  name: "",
  method: "",
  genre: "",
  price: "1",
  totalQuantity: "1",
  description: "",
};

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export default function PhotoCardCreateForm() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const price = Number(form.price);
  const totalQuantity = Number(form.totalQuantity);
  const { accessToken, isAuthLoading, user, setUser } = useAuth();

  const isFormValid =
    Boolean(image) &&
    Boolean(form.name.trim()) &&
    Boolean(form.method) &&
    Boolean(form.genre) &&
    Boolean(form.description.trim()) &&
    Number.isInteger(price) &&
    price >= 1 &&
    price <= 1000 &&
    Number.isInteger(totalQuantity) &&
    totalQuantity >= 1 &&
    totalQuantity <= 10;

  // 생성 횟수 확인
  const creation = user?.creation;
  const isQuotaExhausted = creation ? creation.used >= creation.limit : false;

  // 다음 초기화 날짜를 한국 시간으로 표시
  const resetDateText = creation
    ? new Date(creation.nextResetAt).toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        timeZone: "Asia/Seoul",
      })
    : "";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
        [name]: "",
      };

      // 입력 중 검증
      if (name === "price") {
        const price = Number(value);

        if (value === "") {
          nextErrors.price = "가격을 입력해주세요.";
        } else if (!Number.isInteger(price) || price < 1 || price > 1000) {
          nextErrors.price = "가격은 1~1000 사이의 정수여야 합니다.";
        }
      }
      if (name === "totalQuantity") {
        const totalQuantity = Number(value);

        if (value === "") {
          nextErrors.totalQuantity = "총 발행량을 입력해 주세요";
        } else if (
          !Number.isInteger(totalQuantity) ||
          totalQuantity < 1 ||
          totalQuantity > 10
        ) {
          nextErrors.totalQuantity = "총 발행량은 1~10 사이의 정수여야 합니다.";
        }
      }
      return nextErrors;
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // 이미지 type 확인
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setImage(null);
      setImagePreview("");
      setErrors((previous) => ({
        ...previous,
        image: "JPEG, PNG, WebP 형식의 이미지만 등록할 수 있습니다.",
      }));

      // 초기화
      event.target.value = "";
      return;
    }

    // 이미지 크기 확인
    if (file.size > MAX_IMAGE_SIZE) {
      setImage(null);
      setImagePreview("");
      setErrors((previous) => ({
        ...previous,
        image: "이미지 크기는 10MB 이하여야 합니다.",
      }));

      event.target.value = "";
      return;
    }

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
      nextErrors.name = "포토카드 이름을 입력해주세요.";
    } else if (form.name.trim().length > 15) {
      nextErrors.name = "포토카드 이름은 최대 15자까지 입력 가능합니다.";
    }

    if (!form.method) {
      nextErrors.method = "제작방식을 선택해 주세요.";
    }

    if (!form.genre) {
      nextErrors.genre = "장르를 선택해 주세요.";
    }

    if (form.price === "") {
      nextErrors.price = "가격을 입력해 주세요.";
    } else if (!Number.isInteger(price) || price < 1 || price > 1000) {
      nextErrors.price = "가격은 1~1000 사이의 정수여야 합니다.";
    }

    if (
      form.totalQuantity === "" ||
      !Number.isInteger(totalQuantity) ||
      totalQuantity < 1 ||
      totalQuantity > 10
    ) {
      nextErrors.totalQuantity = "총 발행량은 1~10사이의 정수여야 합니다.";
    }

    if (!form.description) {
      nextErrors.description = "설명을 입력해 주세요";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // 생성 횟수가 바뀌었을 수 있을 때 내 정보를 다시 받아 user.creation 을 최신으로 만든다
  // 화면 이동을 막지 않도록 기다리지 않고, 실패해도 무시한다
  // 응답이 늦게 와서 그사이 로그아웃했거나 다른 계정으로 바뀌었으면 무시한다
  // 갱신에 실패하면 옛 횟수를 보여 주지 않도록 creation 을 지워 "모르는 상태"로 둔다
  const refreshUser = () => {
    const requestedUserId = user?.id;

    api
      .getMe(accessToken)
      .then((me) =>
        setUser((current) => (current?.id === me.id ? me : current)),
      )
      .catch(() =>
        setUser((current) =>
          current?.id === requestedUserId
            ? { ...current, creation: null }
            : current,
        ),
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 페이지 이동 확인용
      const isMockMode =
        process.env.NEXT_PUBLIC_MOCK_PHOTO_CARD_CREATE === "true";

      if (isMockMode) {
        const cardName = form.name;
        const method = form.method;

        router.push(
          `/my-gallery/create/success?name=${encodeURIComponent(
            cardName,
          )}&method=${encodeURIComponent(method)}`,
        );

        return;
      }

      const formData = new FormData(event.currentTarget);

      if (image) {
        formData.set("image", image);
      } else {
        formData.delete("image");
      }
      // console.log(formData.get("image"));
      const result = await createPhotoCard(accessToken, formData);

      // 생성 횟수 갱신
      refreshUser();

      const cardName = result.name || form.name;
      const method = result.method || form.method;

      router.push(
        `/my-gallery/create/success?name=${encodeURIComponent(
          cardName,
        )}&method=${encodeURIComponent(method)}`,
      );

      // console.log("포토카드 생성 성공", result);
    } catch (error) {
      // ApiError 가 아니면(예상 못 한 에러) 결과를 알 수 없는 경우로 본다
      const status = error instanceof ApiError ? error.status : 0;

      // 2xx: 서버는 생성했고 응답 본문만 읽지 못했다 → 성공 화면
      if (status >= 200 && status < 300) {
        // 서버에서는 만들어졌으므로 생성 횟수도 갱신한다
        refreshUser();
        router.push(
          `/my-gallery/create/success?name=${encodeURIComponent(
            form.name,
          )}&method=${encodeURIComponent(form.method)}`,
        );
        return;
      }

      // 400: 입력값 문제 → 폼에 남아서 수정
      if (status === 400) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        return;
      }
      // 409: 이번 달 생성 횟수 초과 → 폼에 남아서 안내하고, 횟수를 다시 받아 버튼을 막는다
      if (status === 409) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        refreshUser();
        return;
      }
      // 토큰 만료, 로그인 안함 401 -> 로그인페이지로 이동
      if (status === 401) {
        router.push("/login");
        return;
      }

      // 0: 응답을 받지 못했다 → 서버가 만들었는지 알 수 없으므로 실패로 단정하지 않는다
      if (status === 0) {
        setSubmitError(
          "생성 결과를 확인하지 못했습니다. \n마이갤러리에서 카드가 만들어졌는지 확인한 뒤 다시 시도해 주세요.",
        );
        setIsSubmitting(false);
        return;
      }

      //  그 밖의 서버 오류(403, 5xx 등)는 실패 화면으로
      router.push(
        `/my-gallery/create/fail?name=${encodeURIComponent(
          form.name,
        )}&method=${encodeURIComponent(form.method)}`,
      );
    }
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>포토카드 생성</h1>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isQuotaExhausted && (
            <p role="alert" className={styles.submitError}>
              이번 달 포토카드 생성 횟수({creation.limit}회)를 모두
              사용했습니다.
              {"\n"}
              {resetDateText}부터 다시 만들 수 있습니다.
            </p>
          )}
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
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={styles.hiddenInput}
                onChange={handleImageChange}
              />
            </div>
          </Field>

          {imagePreview && (
            <div className={styles.previewBox}>
              <Image
                src={imagePreview}
                alt="포토카드 이미지 미리보기"
                width={180}
                height={135}
                unoptimized
                className={styles.previewImage}
              />
            </div>
          )}

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
                className={errors.method ? styles.selectError : styles.select}
              >
                <option value="" disabled hidden>
                  제작방식을 선택해 주세요
                </option>
                <option value="PHOTO">촬영</option>
                <option value="CRAFT">제작</option>
                <option value="AI">AI생성</option>
                <option value="ETC">기타</option>
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
                className={errors.genre ? styles.selectError : styles.select}
              >
                <option value="" disabled hidden>
                  장르를 선택해 주세요
                </option>
                <option value="LANDSCAPE">풍경</option>
                <option value="PORTRAIT">인물</option>
                <option value="ANIMAL">동물</option>
                <option value="PLANT">식물</option>
                <option value="OBJECT">사물</option>
                <option value="ETC">기타</option>
              </select>

              <span className={styles.selectIcon}>
                <Icon name="down" size={28} />
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
            htmlFor="photo-card-totalQuantity"
            error={errors.totalQuantity}
          >
            <input
              id="photo-card-totalQuantity"
              name="totalQuantity"
              type="number"
              min="1"
              max="10"
              value={form.totalQuantity}
              onChange={handleChange}
              className={
                errors.totalQuantity ? styles.inputError : styles.input
              }
            />
          </Field>

          <Field
            label="포토카드 설명"
            htmlFor="photo-card-description"
            error={errors.description}
          >
            <div className={styles.textareaWrapper}>
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
            </div>
          </Field>
          {submitError && (
            <p role="alert" className={styles.submitError}>
              {submitError}
            </p>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={
              isSubmitting || !isFormValid || isAuthLoading || isQuotaExhausted
            }
          >
            {isSubmitting ? "생성 중.." : "생성하기"}
          </button>
        </form>
      </section>
    </main>
  );
}
