import React from "react";

export const CollectingPersonalInformationAgreementTextKo = () => (
  <>
    <h4>1. 수집하는 개인정보 항목</h4>
    <p>
      {" "}
      - 회원 가입 및 서비스 이용 과정에서 뮤직랩은 아래와 같은 정보를
      회원으로부터 수집합니다.
    </p>
    <p> - ID(이메일), 비밀번호, 성명, 내국인/외국인, 성별, 생년월일</p>
    <br />
    <p>
      {" "}
      - 서비스 이용과정이나 서비스 제공 업무 처리 과정에서 아래와 같은 정보들이
      자동으로 생성될수 있습니다.
    </p>
    <p>
      {" "}
      - 쿠키, 서비스 이용기록(방문일시, IP, 불량이용 기록 등),
      기기정보(고유기기식별값, OS버전)
    </p>
    <br />
    <h4>2. 개인정보 수집 목적</h4>
    <p> - 서비스 회원 가입, 서비스 이용 및 상담</p>
    <p> - 부정이용 확인∙방지 및 서비스 이용 분석과 통계</p>
    <br />
    <h4>
      3. 뮤직랩은 관계 법령이나 고객님의 동의 없이 고객님의 개인정보를 제3자에게
      제공하지 않습니다.
    </h4>
    <br />
  </>
);

export const CollectingPersonalInformationAgreementTextEn = () => (
  <>
    <h4>1. Collected personal information</h4>
    <p>
      {" "}
      - Music Lab collects the following personal information for the process of
      signing up for Music Lab and using the service.
    </p>
    <p>
      {" "}
      - Account(e-mail), password, name, and whether you are a South Korean
      resident or foreigner
    </p>
    <p>
      {" "}
      - The following information may be automatically generated while using the
      service or processing the service-related tasks.
    </p>
    <p>
      {" "}
      - Cookies, service usage history (date of log-in, IP address, fraudulent
      usage, etc), device information (unique device identifiers and OS version)
    </p>
    <br />
    <h4>2. Purpose of collecting personal information</h4>
    <p>
      {" "}
      - Identification of users to confirm or prevent usage of multiple
      memberships
    </p>
    <p> - Analysis and statistics of service usage</p>
    <br />
    <h4>
      3. Music Lab does not provide your personal information to third parties
      without the agreement of the relevant laws or your agreement.
    </h4>
    <br />
  </>
);

export default {
  ko: <CollectingPersonalInformationAgreementTextKo />,
  en: <CollectingPersonalInformationAgreementTextEn />,
};
