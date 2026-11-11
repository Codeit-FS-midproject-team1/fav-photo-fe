"use client";

import { useState } from "react";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import TextArea from "@/components/textArea/TextArea";
import CardTile from "@/components/cardTile/CardTile";
import * as styles from "./ExchangeOfferFormModal.css.js";

export default function ExchangeOfferFormModal({
  open,
  selectedCard,
  onBack,
  onClose,
  onSubmit,
  submitting = false,
  error = "",
}) {
  const [description, setDescription] = useState("");

  if (!open || !selectedCard) return null;

  const trimmedDescription = description.trim();
  const canSubmit = trimmedDescription.length > 0 && !submitting;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSubmit) return;

    onSubmit({
      photoCardId: selectedCard.id,
      description: trimmedDescription,
    });
  };

  return (
    <Modal open={open} onClose={onClose} size="xl" mobileType="full">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>포토카드 교환하기</p>
          <h2 className={styles.title}>교환 제시 정보를 입력해 주세요</h2>
        </header>

        <div className={styles.content}>
          <section className={styles.cardSection} aria-label="선택한 포토카드">
            <h3 className={styles.sectionTitle}>선택한 포토카드</h3>

            <div className={styles.cardPreview}>
              <CardTile
                card={selectedCard}
                owned
                rows={[
                  { label: "가격", value: `${selectedCard.price} P` },
                  { label: "수량", value: selectedCard.quantity },
                ]}
              />
            </div>
          </section>

          <form className={styles.form} onSubmit={handleSubmit}>
            <TextArea
              label="교환 제시 내용"
              placeholder="교환을 제안하는 내용을 입력해 주세요."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={200}
              disabled={submitting}
              required
            />

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div className={styles.actions}>
              <Button
                type="button"
                variant="secondary"
                className={styles.actionButton}
                onClick={onBack}
                disabled={submitting}
              >
                이전
              </Button>

              <Button
                type="submit"
                className={styles.actionButton}
                disabled={!canSubmit}
              >
                {submitting ? "제안 중..." : "교환 제안하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
