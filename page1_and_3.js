document.addEventListener("DOMContentLoaded", () => {
  let isAnimating = false; // 확대 효과 진행 상태를 나타내는 플래그

  // 모든 <a> 태그에 이벤트 리스너 추가
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href"); // href 속성 가져오기

      // 앵커 링크(#로 시작)일 경우만 기본 동작 방지
      if (targetId.startsWith("#")) {
        event.preventDefault(); // 기본 동작 방지

        const targetElement = document.querySelector(targetId); // 해당 섹션 찾기

        if (targetElement) {
          isAnimating = true; // 애니메이션 시작

          // body에 이벤트 차단 클래스 추가
          document.body.classList.add("no-pointer");

          // 부드럽게 스크롤 이동
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });

          // 확대 효과 추가
          targetElement.classList.add("zoom-target", "zoom");

          // 1초 후 확대 효과 제거 및 상태 해제
          setTimeout(() => {
            targetElement.classList.remove("zoom");
            isAnimating = false; // 애니메이션 종료
            document.body.classList.remove("no-pointer"); // 차단 해제
          }, 1000);
        }
      }
    });
  });

  // mouseover 이벤트를 차단
  document.addEventListener("mouseover", (event) => {
    if (isAnimating) {
      event.stopPropagation(); // 이벤트 전파 차단
    }
  });

  // mouseenter 이벤트를 차단 (필요 시 추가)
  document.addEventListener("mouseenter", (event) => {
    if (isAnimating) {
      event.stopPropagation(); // 이벤트 전파 차단
    }
  });

  // 체크박스와 시간표 셀 선택
  const checklist = document.querySelector("#checklist");
  const tableCells = document.querySelectorAll("#schedule tbody td");

  // 체크박스 이벤트 핸들러
  checklist.addEventListener("change", () => {
    // 체크된 운동 이름 가져오기
    const checkedValues = Array.from(
      checklist.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.value);

    // 시간표 스타일 업데이트
    tableCells.forEach((cell) => {
      if (checkedValues.includes(cell.textContent.trim())) {
        cell.style.backgroundColor = "lightgreen"; // 선택된 운동은 색칠
      } else {
        cell.style.backgroundColor = ""; // 선택되지 않은 운동은 초기화
      }
    });
  });

  // 모든 program 요소를 선택
  const programs = document.querySelectorAll(".section > section");

  programs.forEach((program) => {
    const image = program.querySelector(".program-img");
    const details = program.querySelector(".program-details");

    // 마우스를 해당 섹션 위로 올릴 때
    program.addEventListener("mouseover", () => {
      image.style.display = "none"; // 해당 섹션의 이미지 숨기기
      details.style.display = "block"; // 해당 섹션의 텍스트 보이기
    });

    // 마우스를 해당 섹션 밖으로 뗄 때
    program.addEventListener("mouseout", () => {
      image.style.display = "block"; // 해당 섹션의 이미지 보이기
      details.style.display = "none"; // 해당 섹션의 텍스트 숨기기
    });
  });
});

//page3(문의게시판)페이지의 자바스크립트 코드입니다.

document.addEventListener("DOMContentLoaded", () => {
  // 기존 문의 데이터
  const initialInquiries = [
    { title: "운동 강사 변경 일정", text: "변경 일정이 언제인가요?" },
    { title: "프로그램 취소", text: "신청한 프로그램을 취소하고 싶습니다." },
    { title: "수영장 이용 시간", text: "수영장 운영 시간이 어떻게 되나요?" },
  ];

  // DOM 요소 선택
  const inquiryList = document.querySelector("#inquiry-list");
  const inquiryForm = document.querySelector("#inquiry-form");
  const inquiryTitle = document.querySelector("#inquiry-title");
  const inquiryText = document.querySelector("#inquiry-text");

  // 기존 문의 표시
  function loadInquiries() {
    initialInquiries.forEach((inquiry) =>
      addInquiry(inquiry.title, inquiry.text)
    );
  }

  // 새로운 문의 추가
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 폼 기본 동작 방지

    const title = inquiryTitle.value.trim(); // 제목 입력값
    const text = inquiryText.value.trim(); // 내용 입력값

    if (title && text) {
      addInquiry(title, text); // 새 문의 추가
      inquiryTitle.value = ""; // 제목 초기화
      inquiryText.value = ""; // 내용 초기화
    } else {
      alert("제목과 내용을 모두 입력하세요!");
    }
  });

  // 문의 항목 추가 (공통 함수)
  function addInquiry(title, text) {
    // 리스트 항목 생성
    const listItem = document.createElement("li");

    // 제목 추가
    const inquiryTitle = document.createElement("strong");
    inquiryTitle.textContent = title;

    // 내용 추가
    const inquiryText = document.createElement("div");
    inquiryText.className = "content";
    inquiryText.textContent = text;

    // 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete-btn";

    // 삭제 버튼 클릭 이벤트
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // 부모 클릭 이벤트 방지
      listItem.remove(); // 항목 삭제
    });

    // 클릭 이벤트로 드롭다운 기능 추가
    listItem.addEventListener("click", () => {
      listItem.classList.toggle("open"); // 'open' 클래스 토글
    });

    // 항목 구성 및 추가
    listItem.appendChild(inquiryTitle);
    listItem.appendChild(deleteButton);
    listItem.appendChild(inquiryText);

    inquiryList.appendChild(listItem);
  }

  // 초기 데이터 로드
  loadInquiries();
});
