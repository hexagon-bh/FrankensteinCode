const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const outputDiv = document.getElementById('output');

// 브라우저가 음성 합성을 지원하는지 확인
if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    speakButton.addEventListener('click', () => {
        const textToSpeak = textInput.value; // 입력창의 텍스트 가져오기
        if (textToSpeak.trim() !== '') {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // 음성 합성 완료 시 이벤트 처리
            utterance.onend = () => {
                console.log('음성 출력 완료');
            };

            // 음성 출력 시작
            synth.speak(utterance);
        } else {
            outputDiv.innerHTML = '입력된 글자가 없습니다.';
        }
    });
} else {
    outputDiv.innerHTML = '죄송합니다, 브라우저가 음성 합성을 지원하지 않습니다.';
}
