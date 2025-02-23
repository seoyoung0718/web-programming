document.addEventListener("DOMContentLoaded", () => {
  // 폼의 테두리 및 배경색을 변경하는 공통 함수
  const setStyle = (element, borderColor) => {
    element.style.transition = "border 0.3s ease, background-color 0.3s ease";
    element.style.border = `3px solid ${borderColor}`;
  };

  // 필드 상태 변수(필드별 테두리색 적용 및 유효성 검사를 위함)
  let firstField = false;
  let secondField = false;
  let thirdField = false;
  let fourthField = false;

  // 전체 폼 선택
  const form = document.querySelector("form");
  const resetButton = form.querySelector("button[type='reset']");

  // 전체 폼 테두리 업데이트 함수
  const updateFormBorder = () => {
    if (firstField && secondField && thirdField && fourthField) {
      setStyle(form, "green");
    } else {
      setStyle(form, "#ccc");
    }
  };

  // 입력한 내용을 가져오는 함수
  const collectFormData = () => {
    const getLabelText = (inputId) => {
      const label = document.querySelector(`label[for="${inputId}"]`);
      return label ? label.textContent.trim() : "";
    };

    // 필드별 데이터 수집
    const nameLabel = getLabelText("name");
    const emailLabel = getLabelText("email");
    const telLabel = getLabelText("tel");
    const genderLabel = Array.from(
      document.querySelectorAll("input[name='gender']")
    )
      .find((input) => input.checked)
      ?.labels[0].textContent.trim();

    const startDateLabel = getLabelText("start_date");
    const programLabel = getLabelText("program");
    const lockerLabel = Array.from(
      document.querySelectorAll("input[name='locker']")
    )
      .find((input) => input.checked)
      ?.labels[0].textContent.trim();

    const weekLabels = Array.from(
      document.querySelectorAll("input[name='week']:checked")
    ).map((checkbox) => checkbox.labels[0].textContent.trim());

    const healthLabels = Array.from(
      document.querySelectorAll("input[name='health']:checked")
    ).map((checkbox) => checkbox.labels[0].textContent.trim());
    const otherHealth = document.getElementById("other").value.trim();

    const experience = document.getElementById("experience").value.trim();
    const goal = document.getElementById("goal").value.trim();

    return {
      nameLabel,
      emailLabel,
      telLabel,
      genderLabel,
      startDateLabel,
      programLabel,
      lockerLabel,
      weekLabels: weekLabels.join(", "),
      healthLabels: healthLabels.join(", ") || "없음",
      otherHealth,
      experience,
      goal,
    };
  };

  // 유효성 검사 실패 시 스타일 적용 및 focus 이동
  const highlightInvalidField = () => {
    if (!firstField) {
      const invalidInput = Array.from(
        personalFieldset.querySelectorAll("input")
      ).find((input) => {
        if (input.type === "radio") {
          const radioGroup = Array.from(
            personalFieldset.querySelectorAll(`input[name="${input.name}"]`)
          );
          return !radioGroup.some((radio) => radio.checked);
        }
        return !input.value.trim() || !input.validity.valid;
      });

      if (invalidInput) {
        setStyle(invalidInput, "red");
        invalidInput.focus();
        if (invalidInput.type === "radio") {
          setStyle(personalFieldset, "red");
          personalFieldset.focus();
          return;
        }
        return;
      }
    }

    if (!secondField) {
      const invalidInput = Array.from(
        programFieldset.querySelectorAll("input, select")
      ).find((input) => {
        if (input.type === "checkbox" || input.type === "radio") {
          return !input.checked; // 체크박스나 라디오 버튼이 선택되지 않은 경우
        }
        return !input.value.trim() || !input.validity.valid; // 일반 input/select의 유효성 검사
      });

      console.log("Program fieldset invalid input:", invalidInput);

      if (invalidInput) {
        setStyle(invalidInput, "red");
        invalidInput.focus();

        if (invalidInput.type === "checkbox" || invalidInput.type === "radio") {
          setStyle(programFieldset, "red");
          programFieldset.focus();
          return;
        }
        return;
      }
    }

    if (!thirdField) {
      const invalidInput = Array.from(
        healthFieldset.querySelectorAll("input")
      ).find((input) => !input.value.trim() || !input.validity.valid);
      console.log("Health fieldset invalid input:", invalidInput);
      if (invalidInput) {
        setStyle(healthFieldset, "red");
        invalidInput.focus();
        return;
      }
    }

    if (!fourthField) {
      const invalidTextarea = Array.from(
        goalFieldset.querySelectorAll("textarea")
      ).find((textarea) => !textarea.value.trim() || !textarea.validity.valid);
      console.log("Goal fieldset invalid textarea:", invalidTextarea);
      if (invalidTextarea) {
        setStyle(invalidTextarea, "red");
        invalidTextarea.focus();
      }
    }
  };

  // 모든 유효성 검사가 통과되었을 때 alert 표시 및 입력내용 보여줌
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    if (firstField && secondField && thirdField && fourthField) {
      const formData = collectFormData();
      alert(`
          ${formData.nameLabel} ${document.getElementById("name").value.trim()}
          ${formData.emailLabel} ${document
        .getElementById("email")
        .value.trim()}
          ${formData.telLabel} ${document.getElementById("tel").value.trim()}
          성별: ${formData.genderLabel}
          ${formData.startDateLabel} ${
        document.getElementById("start_date").value
      }
          ${formData.programLabel} ${document.getElementById("program").value}
          사물함 이용: ${formData.lockerLabel}
          참여 요일: ${formData.weekLabels}
          건강 상태: ${formData.healthLabels}
          기타 건강 정보: ${formData.otherHealth}
          운동 경력: ${formData.experience}
          운동 목표: ${formData.goal}

          제출하시겠습니까?
        `);
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
      highlightInvalidField();
    }
  });

  // Reset 버튼 클릭 시 입력값 및 스타일 초기화
  resetButton.addEventListener("click", () => {
    form.reset(); // 입력값 초기화

    // 모든 입력 요소 및 fieldset 스타일 초기화
    document
      .querySelectorAll("input, select, textarea, fieldset")
      .forEach((el) => {
        setStyle(el, "#ccc", "transparent"); // 스타일 초기화
      });

    // emailFeedback 및 telFeedback 초기화
    emailFeedback.textContent = "";
    telFeedback.textContent = "";

    // 필드 상태 초기화
    firstField = false;
    secondField = false;
    thirdField = false;
    fourthField = false;

    // 전체 폼 테두리 초기화
    setStyle(form, "#ccc", "transparent");
  });

  // personalfield 상태 체크
  const personalFieldset = document.getElementById("personalfield");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("tel");
  const genderInputs = document.querySelectorAll("input[name='gender']");

  const emailFeedback = document.createElement("p");
  emailInput.parentElement.appendChild(emailFeedback);

  const telFeedback = document.createElement("p");
  telInput.parentElement.appendChild(telFeedback);

  const isValidEmail = (value) =>
    value.indexOf("@") > 1 && value.split("@")[1].indexOf(".") > 1;

  const isValidPhoneNumber = (value) => /^01[0-9]-\d{3,4}-\d{4}$/.test(value);

  const validatePersonalFieldset = () => {
    const isNameValid = nameInput.value.trim() !== "";
    const isEmailValid = isValidEmail(emailInput.value.trim());
    const isTelValid = isValidPhoneNumber(telInput.value.trim());
    const isGenderSelected = Array.from(genderInputs).some(
      (input) => input.checked
    );

    firstField = isNameValid && isEmailValid && isTelValid && isGenderSelected;
    setStyle(personalFieldset, firstField ? "green" : "#ccc");
  };

  // programfield 상태 체크
  const programFieldset = document.getElementById("programfield");
  const dateInput = document.querySelector("#start_date");
  const programInput = document.querySelector("#program");
  const lockerInputs = document.querySelectorAll("input[name='locker']");
  const weekCheckboxes = document.querySelectorAll("input[name='week']");

  const validateProgramFieldset = () => {
    const isDateSelected = dateInput.value.trim() !== "";
    const isProgramSelected = programInput.value.trim() !== "";
    const isLockerSelected = Array.from(lockerInputs).some(
      (input) => input.checked
    );
    const isWeekSelected = Array.from(weekCheckboxes).some(
      (checkbox) => checkbox.checked
    );

    secondField =
      isDateSelected && isProgramSelected && isLockerSelected && isWeekSelected;

    setStyle(programFieldset, secondField ? "green" : "#ccc");
  };

  // healthfield 상태 체크
  const healthFieldset = document.getElementById("healthfield");
  const checkboxes = healthFieldset.querySelectorAll("input[type='checkbox']");
  const otherInput = healthFieldset.querySelector("#other");

  const validateHealthField = () => {
    const isCheckboxChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    const isOtherInputFilled = otherInput.value.trim() !== "";

    thirdField = isCheckboxChecked || isOtherInputFilled;

    setStyle(healthFieldset, thirdField ? "green" : "#ccc");
  };

  // goalfield 상태 체크
  const experienceTextarea = document.getElementById("experience");
  const goalTextarea = document.getElementById("goal");
  const goalFieldset = document.getElementById("goalfield");

  // 목표와 경력 각각의 텍스트 영역 상태를 개별적으로 업데이트
  const updateTextareaBorder = (textarea) => {
    if (textarea.value.trim() !== "") {
      setStyle(textarea, "green");
    } else {
      setStyle(textarea, "#ccc");
    }
  };

  // goalFieldset 전체 상태를 업데이트
  const validateGoalFieldset = () => {
    const isExperienceFilled = experienceTextarea.value.trim() !== "";
    const isGoalFilled = goalTextarea.value.trim();

    // 전체 fieldset 상태 업데이트
    fourthField = isExperienceFilled && isGoalFilled;
    setStyle(goalFieldset, fourthField ? "green" : "#ccc");
  };

  // 이벤트 리스너 추가 및 상태 업데이트
  nameInput.addEventListener("input", () => {
    setStyle(nameInput, nameInput.value.trim() ? "green" : "#ccc");
    validatePersonalFieldset();
    updateFormBorder();
  });

  // 이메일 입력 이벤트 리스너
  emailInput.addEventListener("keyup", () => {
    const value = emailInput.value.trim();
    // 유효성 검사에 따라 피드백 텍스트의 색상을 설정
    emailFeedback.style.color = isValidEmail(value) ? "green" : "red";
    // 유효성 검사 결과에 따라 피드백 메시지를 표시
    emailFeedback.textContent = isValidEmail(value)
      ? "사용 가능한 이메일입니다."
      : "잘못된 이메일 주소입니다.";
    setStyle(emailInput, isValidEmail(value) ? "green" : "red");
    validatePersonalFieldset();
    updateFormBorder();
  });

  // 전화번호 입력 이벤트 리스너
  telInput.addEventListener("keyup", () => {
    const value = telInput.value.trim();
    telFeedback.style.color = isValidPhoneNumber(value) ? "green" : "red";
    telFeedback.textContent = isValidPhoneNumber(value)
      ? "유효한 전화번호 형식입니다."
      : "잘못된 전화번호 형식입니다. 예: 010-1234-5678";
    setStyle(telInput, isValidPhoneNumber(value) ? "green" : "red");
    validatePersonalFieldset();
    updateFormBorder();
  });

  genderInputs.forEach((input) => {
    input.addEventListener("change", () => {
      validatePersonalFieldset();
      updateFormBorder();
    });
  });

  dateInput.addEventListener("change", () => {
    setStyle(dateInput, dateInput.value ? "green" : "#ccc");
    validateProgramFieldset();
    updateFormBorder();
  });

  programInput.addEventListener("change", () => {
    setStyle(programInput, programInput.value ? "green" : "#ccc");
    validateProgramFieldset();
    updateFormBorder();
  });

  lockerInputs.forEach((input) => {
    input.addEventListener("change", () => {
      validateProgramFieldset();
      updateFormBorder();
    });
  });

  weekCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      validateProgramFieldset();
      updateFormBorder();
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      validateHealthField();
      updateFormBorder();
    });
  });

  otherInput.addEventListener("input", () => {
    validateHealthField();
    updateFormBorder();
  });

  experienceTextarea.addEventListener("input", () => {
    updateTextareaBorder(experienceTextarea);
    validateGoalFieldset();
    updateFormBorder();
  });

  goalTextarea.addEventListener("input", () => {
    updateTextareaBorder(goalTextarea);
    validateGoalFieldset();
    updateFormBorder();
  });
});
