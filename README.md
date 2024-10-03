### ERD 설명

![erd 참조 사진](/erd.png)

1. user (유저) 테이블
   - id (INTEGER): 각 사용자의 고유 식별자입니다.
   - name (VARCHAR): 사용자의 이름을 저장하는 필드입니다.
2. lecture (특강) 테이블
   - id (INTEGER): 각 강의의 고유 식별자입니다.
   - name (VARCHAR): 강의의 이름을 저장합니다.
   - date (DATE): 강의 날짜를 저장하는 필드입니다.
   - professor (VARCHAR): 강의를 진행하는 강연자 이름을 저장합니다.
   - maximum (INTEGER): 강의의 최대 수강 인원입니다. 기본값은 30으로 설정되어 있습니다.
   - count (INTEGER): 현재 강의에 등록된 인원 수입니다. 기본값은 0입니다.
3. lectureUser (특강신청) 테이블
   - id (INTEGER): 고유한 식별자입니다.
   - userId (INTEGER): 신청한 사용자의 ID를 나타냅니다. 이는 user 테이블의 id와 외래키(FK) 관계를 가집니다.
   - lectureId (INTEGER): 신청한 강의의 ID를 나타냅니다. 이는 lecture 테이블의 id와 외래키(FK) 관계를 가집니다.
   - createdAt (DATETIME): 신청이 이루어진 날짜와 시간을 기록합니다.
4. 관계 설명:
   - user와 lecture는 직접적인 관계가 없으며, lectureUser 테이블을 통해 N (다대다) 관계를 형성하고 있습니다.
     - 한 명의 사용자가 여러 강의를 신청할 수 있고, 하나의 강의에도 여러 사용자가 신청할 수 있는 구조입니다.
     - lectureUser는 user 테이블과 lecture 테이블 사이에서 중간 연결 테이블의 역할을 하여 사용자가 어떤 강의에 신청했는지 추적합니다.
