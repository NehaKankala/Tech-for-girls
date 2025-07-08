let clickCount = 0;
const maxClicks = 5;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const shareBtn = document.getElementById("shareBtn");
  const submitBtn = document.getElementById("submitBtn");
  const clickCountText = document.getElementById("clickCountText");
  const thankYou = document.getElementById("thankYou");

  shareBtn.addEventListener("click", () => {
    if (clickCount < maxClicks) {
      const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
      window.open(`https://wa.me/?text=${message}`, "_blank");
      clickCount++;
      clickCountText.textContent = `Click count: ${clickCount}/${maxClicks}`;
      if (clickCount === maxClicks) {
        alert("Sharing complete. Please continue.");
        submitBtn.disabled = false;
      }
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (clickCount < maxClicks) {
      alert("Please share on WhatsApp 5 times before submitting.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const fileInput = document.getElementById("screenshot");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("file", fileInput.files[0]);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxvgy-yMuV2lL-6kStu25MD-fnnCipPJNm9t-0vVSnSyg_kkN1NxVirYa6juv8AVGx7/exec", {
        method: "POST",
        body: formData
      });

      form.reset();
      clickCount = 0;
      clickCountText.textContent = `Click count: 0/${maxClicks}`;
      submitBtn.disabled = true;
      thankYou.style.display = "block";
      setTimeout(() => {
        thankYou.style.display = "none";
      }, 4000);
    } catch (error) {
      alert("Submission failed. Please try again later.");
      console.error(error);
    }
  });
});

