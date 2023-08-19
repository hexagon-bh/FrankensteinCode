// HTML 요소 참조
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const cameraButton = document.getElementById('cameraButton');
const output = document.getElementById('output');
const cameraView = document.getElementById('cameraView');

// 음성 합성 API 초기화
const synth = window.speechSynthesis;

// 카메라 접근 허용 여부를 저장할 변수
let cameraAllowed = false;

// 카메라 버튼 클릭 이벤트 리스너
cameraButton.addEventListener('click', async () => {
    try {
        // 미디어 디바이스 접근 권한 요청
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraView.srcObject = stream;
        cameraAllowed = true;
    } catch (error) {
        console.error('카메라 접근 권한을 허용하지 않았거나 카메라를 찾을 수 없습니다.', error);
        output.textContent = '카메라 접근 권한을 허용하지 않았거나 카메라를 찾을 수 없습니다.';
    }
});

// 버튼 클릭 이벤트 리스너 추가
speakButton.addEventListener('click', () => {
    const textToSpeak = textInput.value; // 입력창의 값 가져오기
    
    if (textToSpeak) {
        // 음성 생성
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // 음성 출력
        synth.speak(utterance);

        // 출력 텍스트 업데이트
        output.textContent = "음성 출력 중...";

        // 음성 출력이 끝나면 실행되는 이벤트 리스너
        utterance.onend = () => {
            output.textContent = "음성 출력 완료";
        };
    } else {
        output.textContent = "입력창에 내용을 입력하세요.";
    }
});
