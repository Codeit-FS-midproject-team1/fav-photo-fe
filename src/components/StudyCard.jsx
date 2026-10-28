// StudyCard.jsx
import { useEffect, useState } from "react";

export default function StudyCard({ studyId }) {
  const [study, setStudy] = useState(null);

  useEffect(() => {
    fetch(`/api/studies/${studyId}`)
      .then((res) => res.json())
      .then(setStudy);
  }, []);

  if (!study) return null;

  return (
    <div>
      <h3>{study.studyName}</h3>        {/* ERD에는 name */}
      <p>{study.owner.nickName}</p>     {/* ERD에는 user.nickname */}
      <p>{study.totalPoint}점</p>       {/* ERD에는 없는 컬럼 */}
      <p>{study.createdDate}</p>        {/* ERD에는 createdAt */}
    </div>
  );
}