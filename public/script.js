document.addEventListener('DOMContentLoaded', () => {
    const voiceButtonsContainer = document.getElementById('voice-buttons');
    const speechButton = document.getElementById('speech-button');
    const inputText = document.getElementById('input-text');
    let selectedVoice = null;
    let synth = window.speechSynthesis;

    // List of available voices
    let voices = [];

    function populateVoices() {
        // Filter to include only English-speaking voices
        voices = synth.getVoices().filter(voice => voice.lang.startsWith('en'));
        voices.slice(0, 5).forEach((voice, index) => {
            const button = document.createElement('button');
            button.classList.add('voice-button');
            button.style.backgroundImage = `url('avatar${index + 1}.png')`; // Use a different avatar image for each button
            button.addEventListener('click', () => selectVoice(voice));
            voiceButtonsContainer.appendChild(button);
        });
    }

    function selectVoice(voice) {
        selectedVoice = voice;
    
        // Remove 'selected' class from all buttons
        document.querySelectorAll('.voice-button').forEach(button => {
            button.classList.remove('selected');
        });
    
        // Add 'selected' class to the clicked button
        const clickedButton = Array.from(document.querySelectorAll('.voice-button')).find(button =>
            button.style.backgroundImage.includes(`avatar${voices.indexOf(voice) + 1}.png`)
        );
        if (clickedButton) {
            clickedButton.classList.add('selected');
        }
    }
    
    

    function convertToSpeech() {
        const text = inputText.value.trim();

        if (text && selectedVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            synth.speak(utterance);
        } else {
            alert('Please enter text and select a voice before clicking "Speech".');
        }
    }

    // Add an event listener for the speechButton
    speechButton.addEventListener('click', convertToSpeech);

    // Populate voices when the voices are changed
    synth.onvoiceschanged = populateVoices;
});
