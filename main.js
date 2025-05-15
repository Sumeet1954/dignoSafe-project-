/**
 * DignoSafe AI - Main JavaScript
 * Handles general functionality for the website
 */

// Declare bootstrap variable
let bootstrap

// Declare initVoiceAssistant variable
let initVoiceAssistant

document.addEventListener("DOMContentLoaded", () => {
  // Initialize sidebar functionality
  initSidebar()

  // Initialize voice assistant
  initVoiceAssistant = () => {
    // Placeholder for voice assistant initialization
    console.log("Voice assistant initialized (placeholder)")
  }
  initVoiceAssistant()

  // Add scroll event for navbar
  handleNavbarScroll()

  // Initialize tooltips and popovers if Bootstrap is available
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  } else {
    // Mock Bootstrap if it's not available
    bootstrap = {
      Tooltip: class {
        constructor(element) {
          this.element = element
          this.show = () => console.log("Tooltip shown (mock)")
        }
      },
      Popover: class {
        constructor(element) {
          this.element = element
          this.show = () => console.log("Popover shown (mock)")
        }
      },
    }
  }

  // Initialize newsletter form
  initNewsletterForm()
})

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const closeSidebar = document.getElementById("closeSidebar")
  const sidebarOverlay = document.getElementById("sidebarOverlay")

  if (!sidebar || !sidebarToggle || !closeSidebar || !sidebarOverlay) return

  // Open sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.add("active")
    sidebarOverlay.style.display = "block"
    document.body.style.overflow = "hidden"

    // Accessibility
    sidebar.setAttribute("aria-hidden", "false")
    sidebarToggle.setAttribute("aria-expanded", "true")
  })

  // Close sidebar
  function closeSidebarMenu() {
    sidebar.classList.remove("active")
    sidebarOverlay.style.display = "none"
    document.body.style.overflow = ""

    // Accessibility
    sidebar.setAttribute("aria-hidden", "true")
    sidebarToggle.setAttribute("aria-expanded", "false")
  }

  closeSidebar.addEventListener("click", closeSidebarMenu)
  sidebarOverlay.addEventListener("click", closeSidebarMenu)

  // Close sidebar on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebarMenu()
    }
  })

  // Set initial ARIA attributes
  sidebar.setAttribute("aria-hidden", "true")
  sidebarToggle.setAttribute("aria-expanded", "false")
}

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar")
  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled")
    } else {
      navbar.classList.remove("navbar-scrolled")
    }
  })
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault()

      const emailInput = form.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (validateEmail(email)) {
        // In a real implementation, you would send this to your backend
        // For now, we'll just show a success message
        showNotification("Thank you for subscribing to our newsletter!", "success")
        form.reset()
      } else {
        showNotification("Please enter a valid email address.", "error")
      }
    })
  })
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
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

