/**
 * DignoSafe AI - Voice Assistant
 * Handles voice assistant functionality
 */

document.addEventListener("DOMContentLoaded", () => {
    initVoiceAssistant()
  })
  
  /**
   * Initialize voice assistant functionality
   */
  function initVoiceAssistant() {
    const voiceAssistant = document.getElementById("voiceAssistant")
    const voiceAssistantToggle = document.getElementById("voiceAssistantToggle")
    const voiceAssistantPanel = document.getElementById("voiceAssistantPanel")
    const closeVoiceAssistant = document.getElementById("closeVoiceAssistant")
    const startVoiceBtn = document.getElementById("startVoiceBtn")
    const voiceStatus = document.getElementById("voiceStatus")
    const voiceAssistantMessages = document.getElementById("voiceAssistantMessages")
  
    if (
      !voiceAssistant ||
      !voiceAssistantToggle ||
      !voiceAssistantPanel ||
      !closeVoiceAssistant ||
      !startVoiceBtn ||
      !voiceStatus ||
      !voiceAssistantMessages
    )
      return
  
    // Open voice assistant
    voiceAssistantToggle.addEventListener("click", () => {
      voiceAssistantPanel.style.display = "block"
  
      // Accessibility
      voiceAssistantPanel.setAttribute("aria-hidden", "false")
      voiceAssistantToggle.setAttribute("aria-expanded", "true")
    })
  
    // Close voice assistant
    closeVoiceAssistant.addEventListener("click", () => {
      voiceAssistantPanel.style.display = "none"
  
      // Accessibility
      voiceAssistantPanel.setAttribute("aria-hidden", "true")
      voiceAssistantToggle.setAttribute("aria-expanded", "false")
    })
  
    // Voice recognition functionality
    let recognition
    let isListening = false
  
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      // Initialize speech recognition
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
  
      // Handle speech recognition results
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        addUserMessage(transcript)
        processUserInput(transcript)
      }
  
      // Handle speech recognition end
      recognition.onend = () => {
        isListening = false
        startVoiceBtn.classList.remove("recording")
        voiceStatus.textContent = "Tap to speak"
      }
  
      // Handle speech recognition errors
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        isListening = false
        startVoiceBtn.classList.remove("recording")
        voiceStatus.textContent = "Error. Tap to try again."
      }
  
      // Start/stop voice recognition
      startVoiceBtn.addEventListener("click", () => {
        if (isListening) {
          recognition.stop()
          isListening = false
          startVoiceBtn.classList.remove("recording")
          voiceStatus.textContent = "Tap to speak"
        } else {
          recognition.start()
          isListening = true
          startVoiceBtn.classList.add("recording")
          voiceStatus.textContent = "Listening..."
        }
      })
    } else {
      // Browser doesn't support speech recognition
      startVoiceBtn.disabled = true
      voiceStatus.textContent = "Voice recognition not supported in this browser."
    }
  
    // Set initial ARIA attributes
    voiceAssistantPanel.setAttribute("aria-hidden", "true")
    voiceAssistantToggle.setAttribute("aria-expanded", "false")
  }
  
  /**
   * Add user message to voice assistant
   * @param {string} message - User message
   */
  function addUserMessage(message) {
    const voiceAssistantMessages = document.getElementById("voiceAssistantMessages")
    if (!voiceAssistantMessages) return
  
    const messageElement = document.createElement("p")
    messageElement.className = "user-message"
    messageElement.textContent = message
  
    voiceAssistantMessages.appendChild(messageElement)
    voiceAssistantMessages.scrollTop = voiceAssistantMessages.scrollHeight
  }
  
  /**
   * Add assistant message to voice assistant
   * @param {string} message - Assistant message
   */
  function addAssistantMessage(message) {
    const voiceAssistantMessages = document.getElementById("voiceAssistantMessages")
    if (!voiceAssistantMessages) return
  
    const messageElement = document.createElement("p")
    messageElement.className = "assistant-message"
    messageElement.textContent = message
  
    voiceAssistantMessages.appendChild(messageElement)
    voiceAssistantMessages.scrollTop = voiceAssistantMessages.scrollHeight
  
    // Text-to-speech if available
    speakMessage(message)
  }
  
  /**
   * Process user input and generate response
   * @param {string} input - User input
   */
  function processUserInput(input) {
    // Convert input to lowercase for easier matching
    const lowerInput = input.toLowerCase()
  
    // Simple keyword-based responses
    // In a real implementation, this would be connected to an AI backend
    setTimeout(() => {
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        addAssistantMessage("Hello! How can I help you with your health today?")
      } else if (lowerInput.includes("headache") || lowerInput.includes("head pain")) {
        addAssistantMessage(
          "I'm sorry to hear you have a headache. How long have you been experiencing it? Is it accompanied by any other symptoms like nausea or sensitivity to light?",
        )
      } else if (lowerInput.includes("fever") || lowerInput.includes("temperature")) {
        addAssistantMessage(
          "Fever can be a sign of infection. How high is your temperature? Do you have any other symptoms like cough, sore throat, or body aches?",
        )
      } else if (lowerInput.includes("cough") || lowerInput.includes("cold")) {
        addAssistantMessage(
          "Coughs can be caused by various conditions. Is it a dry cough or are you producing phlegm? Have you been experiencing any fever or shortness of breath?",
        )
      } else if (lowerInput.includes("appointment") || lowerInput.includes("book")) {
        addAssistantMessage(
          "I can help you book an appointment. Would you like to see a general practitioner or a specialist?",
        )
      } else if (lowerInput.includes("emergency") || lowerInput.includes("urgent")) {
        addAssistantMessage(
          "If you're experiencing a medical emergency, please call emergency services (911) immediately or go to your nearest emergency room.",
        )
      } else if (lowerInput.includes("thank")) {
        addAssistantMessage("You're welcome! Is there anything else I can help you with?")
      } else if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
        addAssistantMessage("Goodbye! Take care of your health and don't hesitate to reach out if you need assistance.")
      } else {
        addAssistantMessage(
          "I understand you're concerned about your health. Could you provide more details about your symptoms so I can better assist you?",
        )
      }
    }, 1000)
  }
  
  /**
   * Speak message using text-to-speech if available
   * @param {string} message - Message to speak
   */
  function speakMessage(message) {
    // Check if browser supports speech synthesis
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(message)
      speech.lang = "en-US"
      speech.volume = 0.8
      speech.rate = 1
      speech.pitch = 1
  
      window.speechSynthesis.speak(speech)
    }
  }
  
  