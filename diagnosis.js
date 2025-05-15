/**
 * DignoSafe AI - Diagnosis Page
 * Handles symptom analysis functionality
 */

document.addEventListener("DOMContentLoaded", () => {
    initDiagnosisPage()
  })
  
  /**
   * Initialize diagnosis page functionality
   */
  function initDiagnosisPage() {
    // Text input form
    const symptomForm = document.getElementById("symptomForm")
    const symptomsTextarea = document.getElementById("symptomsTextarea")
    const clearBtn = document.getElementById("clearBtn")
    const analyzeBtn = document.getElementById("analyzeBtn")
  
    // Voice input
    const recordVoiceBtn = document.getElementById("recordVoiceBtn")
    const recordStatus = document.getElementById("recordStatus")
    const voiceTranscript = document.getElementById("voiceTranscript")
    const transcriptText = document.getElementById("transcriptText")
    const analyzeVoiceBtn = document.getElementById("analyzeVoiceBtn")
  
    // Results
    const diagnosisResult = document.getElementById("diagnosisResult")
    const urgencyBadge = document.getElementById("urgencyBadge")
    const diagnosisText = document.getElementById("diagnosisText")
    const recommendationText = document.getElementById("recommendationText")
    const findHealthcareBtn = document.getElementById("findHealthcareBtn")
    const bookAppointmentBtn = document.getElementById("bookAppointmentBtn")
  
    // Check if elements exist
    if (!symptomForm || !symptomsTextarea || !clearBtn || !analyzeBtn) return
  
    // Clear button functionality
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        symptomsTextarea.value = ""
        symptomsTextarea.focus()
      })
    }
  
    // Analyze symptoms from text input
    if (symptomForm) {
      symptomForm.addEventListener("submit", (event) => {
        event.preventDefault()
  
        const symptoms = symptomsTextarea.value.trim()
  
        if (symptoms.length < 10) {
          showNotification("Please provide more details about your symptoms.", "error")
          return
        }
  
        // Show loading state
        analyzeBtn.disabled = true
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...'
  
        // Simulate API call with timeout
        setTimeout(() => {
          analyzeSymptoms(symptoms)
  
          // Reset button
          analyzeBtn.disabled = false
          analyzeBtn.innerHTML = '<i class="fas fa-search-plus me-2"></i>Analyze Symptoms'
        }, 2000)
      })
    }
  
    // Voice recognition functionality
    let recognition
    let isRecording = false
  
    if (recordVoiceBtn && recordStatus && voiceTranscript && transcriptText && analyzeVoiceBtn) {
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
          transcriptText.textContent = transcript
          voiceTranscript.classList.remove("d-none")
        }
  
        // Handle speech recognition end
        recognition.onend = () => {
          isRecording = false
          recordVoiceBtn.classList.remove("recording")
          recordStatus.textContent = "Tap to start recording"
        }
  
        // Handle speech recognition errors
        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          isRecording = false
          recordVoiceBtn.classList.remove("recording")
          recordStatus.textContent = "Error. Tap to try again."
        }
  
        // Start/stop voice recording
        recordVoiceBtn.addEventListener("click", () => {
          if (isRecording) {
            recognition.stop()
            isRecording = false
            recordVoiceBtn.classList.remove("recording")
            recordStatus.textContent = "Tap to start recording"
          } else {
            recognition.start()
            isRecording = true
            recordVoiceBtn.classList.add("recording")
            recordStatus.textContent = "Listening... Tap to stop"
            voiceTranscript.classList.add("d-none")
          }
        })
  
        // Analyze voice input
        analyzeVoiceBtn.addEventListener("click", () => {
          const symptoms = transcriptText.textContent.trim()
  
          if (symptoms.length < 10) {
            showNotification("Please provide more details about your symptoms.", "error")
            return
          }
  
          // Show loading state
          analyzeVoiceBtn.disabled = true
          analyzeVoiceBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...'
  
          // Simulate API call with timeout
          setTimeout(() => {
            analyzeSymptoms(symptoms)
  
            // Reset button
            analyzeVoiceBtn.disabled = false
            analyzeVoiceBtn.innerHTML = '<i class="fas fa-search-plus me-2"></i>Analyze Symptoms'
          }, 2000)
        })
      } else {
        // Browser doesn't support speech recognition
        recordVoiceBtn.disabled = true
        recordStatus.textContent = "Voice recognition not supported in this browser."
      }
    }
  
    // Find healthcare button
    if (findHealthcareBtn) {
      findHealthcareBtn.addEventListener("click", () => {
        // In a real implementation, this would use geolocation and a map API
        // For now, we'll just show a notification
        showNotification("Searching for healthcare providers near you...", "info")
  
        // Simulate finding providers
        setTimeout(() => {
          showNotification("We found 5 healthcare providers within 10 miles of your location.", "success")
        }, 2000)
      })
    }
  
    // Book appointment button
    if (bookAppointmentBtn) {
      bookAppointmentBtn.addEventListener("click", () => {
        // In a real implementation, this would redirect to an appointment booking page
        // For now, we'll just show a notification
        showNotification("Redirecting to appointment booking...", "info")
  
        // Simulate redirect
        setTimeout(() => {
          window.location.href = "contact.html"
        }, 1500)
      })
    }
  
    /**
     * Analyze symptoms and display results
     * @param {string} symptoms - User symptoms
     */
    function analyzeSymptoms(symptoms) {
      // In a real implementation, this would call an AI backend
      // For now, we'll use a simple keyword-based approach
  
      const lowerSymptoms = symptoms.toLowerCase()
      let diagnosis, recommendation, urgency
  
      // Simple keyword matching
      if (lowerSymptoms.includes("headache") && (lowerSymptoms.includes("fever") || lowerSymptoms.includes("nausea"))) {
        diagnosis = "Based on your symptoms, you may be experiencing a migraine or viral infection."
        recommendation =
          "Rest in a dark, quiet room. Stay hydrated and take over-the-counter pain relievers if needed. If symptoms persist for more than 3 days or worsen, consult a healthcare provider."
        urgency = "medium"
      } else if (lowerSymptoms.includes("chest") && lowerSymptoms.includes("pain")) {
        diagnosis =
          "Chest pain can be a symptom of several conditions, ranging from muscle strain to more serious cardiovascular issues."
        recommendation =
          "If you're experiencing severe chest pain, especially with shortness of breath, sweating, or pain radiating to the arm or jaw, seek emergency medical attention immediately."
        urgency = "high"
      } else if (
        lowerSymptoms.includes("cough") &&
        (lowerSymptoms.includes("fever") || lowerSymptoms.includes("sore throat"))
      ) {
        diagnosis =
          "Your symptoms suggest an upper respiratory infection, which could be a common cold, flu, or other viral infection."
        recommendation =
          "Rest, stay hydrated, and take over-the-counter medications for symptom relief. If you develop difficulty breathing or symptoms worsen after 7 days, consult a healthcare provider."
        urgency = "low"
      } else if (lowerSymptoms.includes("rash") && (lowerSymptoms.includes("itch") || lowerSymptoms.includes("itchy"))) {
        diagnosis = "You may be experiencing an allergic reaction or contact dermatitis."
        recommendation =
          "Avoid potential allergens and irritants. Apply over-the-counter hydrocortisone cream for itching. If the rash spreads, becomes painful, or is accompanied by fever, consult a healthcare provider."
        urgency = "low"
      } else if (
        lowerSymptoms.includes("stomach") &&
        (lowerSymptoms.includes("pain") || lowerSymptoms.includes("nausea") || lowerSymptoms.includes("vomit"))
      ) {
        diagnosis = "Your symptoms suggest gastroenteritis (stomach flu) or food poisoning."
        recommendation =
          "Stay hydrated with clear fluids. Eat bland foods when you can tolerate them. If symptoms persist for more than 2 days, include severe pain, or you notice blood in vomit or stool, seek medical attention."
        urgency = "medium"
      } else {
        diagnosis =
          "Based on the information provided, we cannot determine a specific condition. Your symptoms could be related to various health issues."
        recommendation =
          "Monitor your symptoms and keep a detailed record of when they occur and what makes them better or worse. If symptoms persist or worsen, consult a healthcare provider for a comprehensive evaluation."
        urgency = "low"
      }
  
      // Display results
      if (diagnosisResult && urgencyBadge && diagnosisText && recommendationText) {
        diagnosisText.textContent = diagnosis
        recommendationText.textContent = recommendation
  
        // Set urgency badge
        urgencyBadge.textContent = urgency === "high" ? "Urgent" : urgency === "medium" ? "Moderate" : "Low Urgency"
        urgencyBadge.className = `badge rounded-pill ${urgency === "high" ? "bg-danger" : urgency === "medium" ? "bg-warning" : "bg-success"}`
  
        // Show results
        diagnosisResult.classList.remove("d-none")
  
        // Scroll to results
        diagnosisResult.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }
  
  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info)
   */
  function showNotification(message, type = "info") {
    // Check if notification container exists, if not create it
    let notificationContainer = document.getElementById("notification-container")
  
    if (!notificationContainer) {
      notificationContainer = document.createElement("div")
      notificationContainer.id = "notification-container"
      notificationContainer.style.position = "fixed"
      notificationContainer.style.top = "20px"
      notificationContainer.style.right = "20px"
      notificationContainer.style.zIndex = "9999"
      document.body.appendChild(notificationContainer)
    }
  
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.backgroundColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#17a2b8"
    notification.style.color = "white"
    notification.style.padding = "15px 20px"
    notification.style.borderRadius = "5px"
    notification.style.marginBottom = "10px"
    notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
    notification.style.transition = "all 0.3s ease"
    notification.style.opacity = "0"
    notification.style.transform = "translateY(-20px)"
  
    // Add message
    notification.textContent = message
  
    // Add close button
    const closeBtn = document.createElement("button")
    closeBtn.innerHTML = "&times;"
    closeBtn.style.background = "none"
    closeBtn.style.border = "none"
    closeBtn.style.color = "white"
    closeBtn.style.float = "right"
    closeBtn.style.fontSize = "20px"
    closeBtn.style.marginLeft = "10px"
    closeBtn.style.cursor = "pointer"
    closeBtn.style.padding = "0"
    closeBtn.style.lineHeight = "1"
    closeBtn.setAttribute("aria-label", "Close notification")
  
    closeBtn.addEventListener("click", () => {
      removeNotification(notification)
    })
  
    notification.appendChild(closeBtn)
  
    // Add to container
    notificationContainer.appendChild(notification)
  
    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateY(0)"
    }, 10)
  
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification)
    }, 5000)
  }
  
  /**
   * Remove notification with animation
   * @param {HTMLElement} notification - Notification element to remove
   */
  function removeNotification(notification) {
    notification.style.opacity = "0"
    notification.style.transform = "translateY(-20px)"
  
    setTimeout(() => {
      notification.remove()
    }, 300)
  }
  
  