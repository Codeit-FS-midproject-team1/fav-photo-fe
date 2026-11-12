"use client";

import Modal from "@/components/modal/Modal.jsx";
import * as styles from "./CardImageModal.css.js";

// 우클릭 메뉴(이미지 저장)와 끌어서 저장을 막는다
const blockSave = (event) => event.preventDefault();

/**
 * 원본 사진과 설명을 크게 보여 주는 모달
 * @param {{ card: { imageUrl: string, name: string, description?: string }, onClose: () => void }} props
 */
export default function CardImageModal({ card, onClose }) {
  return (
    <Modal
      label={card.name}
      open
      onClose={onClose}
      size="xl"
      mobileType="sheet"
    >
      <h2 className={styles.title}>{card.name}</h2>
      <div className={styles.imageBox} onContextMenu={blockSave}>
        {/* eslint-disable-next-line @next/next/no-img-element -- 서버 이미지 주소라 CardTile 과 같이 img 사용 */}
        <img
          src={card.imageUrl}
          alt={card.name}
          className={styles.image}
          draggable={false}
          onDragStart={blockSave}
        />
      </div>
      {card.description && (
        <div className={styles.descriptionBox}>
          <p className={styles.description}>{card.description}</p>
        </div>
      )}
    </Modal>
  );
}
