let currentQuestionIndex = 0;
let userResponses = [];
let websiteCategory = '';

// Sample dataset for testing
let dataset = {
    "E-commerce": [
        {
            "Question": "What is the main purpose of the website?",
            "Keywords": ["selling products", "online store", "e-commerce"],
            "Followup_Questions": [
                "Can you specify the types of products you plan to sell?",
                "Is this website meant to be an online store for physical or digital products?"
            ]
        },
        {
            "Question": "What types of products are you planning to sell?",
            "Keywords": ["electronics", "clothing", "furniture", "accessories"],
            "Followup_Questions": [
                "Will you be selling physical or digital products?",
                "Are you considering selling exclusive or limited edition items?"
            ]
        },
        {
            "Question": "What payment methods will your website accept?",
            "Keywords": ["credit card", "PayPal", "bank transfer", "payment gateway"],
            "Followup_Questions": [
                "Will you accept credit card payments, or do you prefer PayPal?",
                "Are you considering a payment gateway integration?"
            ]
        },
    ]
};

// Function to display messages in the chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender === "bot" ? "bot-message" : "user-message");
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle user input
function submitResponse() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return; // Don't process empty responses

    // Store the user's response
    userResponses.push(userInput);
    displayMessage(userInput, "user");

    document.getElementById("userInput").value = "";  // Clear input field

    // Validate the response against the question's keywords
    validateResponse(userInput);
}

// Function to validate the user's response
function validateResponse(userInput) {
    const currentQuestion = dataset[websiteCategory][currentQuestionIndex];
    const keywords = currentQuestion.Keywords;

    let isValid = false;
    for (let keyword of keywords) {
        if (userInput.toLowerCase().includes(keyword.toLowerCase())) {
            isValid = true;
            break;
        }
    }

    if (!isValid) {
        displayMessage("I didn't quite get that. Could you clarify your answer?", "bot");
        // Optionally, ask a follow-up question
        displayMessage(currentQuestion.Followup_Questions[0], "bot");
    } else {
        // If valid, move to the next question
        askNextQuestion();
}

// Function to move to the next question
function askNextQuestion() {
    if (currentQuestionIndex < dataset[websiteCategory].length - 1) {
        currentQuestionIndex++;
        const nextQuestion = dataset[websiteCategory][currentQuestionIndex];
        displayMessage(nextQuestion.Question, "bot");
    } else {
        displayMessage("Thank you! We've gathered all the necessary information.", "bot");
    }
}

// Start the chatbot
function startChat() {
    displayMessage("Hello! What type of website do you want to build?", "bot");
    document.getElementById("startBtn").style.display = "none";  // Hide the Start button
}

// Function to handle category selection
function selectCategory(category) {
    if (dataset[category]) {
        websiteCategory = category;
        currentQuestionIndex = 0;
        const firstQuestion = dataset[category][currentQuestionIndex];
        displayMessage(firstQuestion.Question, "bot");
    } else {
        alert("Invalid category selected.");
    }
}

// Sample interaction for category selection
document.getElementById("startBtn").addEventListener("click", function() {
    const category = prompt("Enter website category (e.g., E-commerce):");
    selectCategory(category);
});

// Initialize chatbot
startChat();
