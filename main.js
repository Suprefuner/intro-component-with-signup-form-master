"use strict"
// VARIABLES -----------------------------------------------------------------
const inputFirstName = document.querySelector("#first-name")
const inputLastName = document.querySelector("#last-name")
const inputEmail = document.querySelector("#email")
const inputPassword = document.querySelector("#pw")

const inputs = [inputFirstName, inputLastName, inputEmail, inputPassword]
const btnClaim = document.querySelector(".btn-claim")

const modal = document.querySelector(".section__modal")
const overlay = document.querySelector(".overlay")

let success = 0

// ----------------------------------------------------------------------------

//Check if input empty or invalid to hide or show
const switchOff = function (input) {
  //hide or show error icon
  input.getAttribute("type") === "email"
    ? input.nextElementSibling.classList[
        `${
          input.value.trim().length === 0 || !input.value.match(/^.+@.+\..+$/)
            ? "remove"
            : "add"
        }`
      ]("hidden")
    : input.nextElementSibling.classList[
        `${input.value.trim().length === 0 ? "remove" : "add"}`
      ]("hidden")

  //hide or show the error msg
  input.getAttribute("type") === "email"
    ? input.nextElementSibling.nextElementSibling.classList[
        `${
          input.value.trim().length === 0 || !input.value.match(/^.+@.+\..+$/)
            ? "remove"
            : "add"
        }`
      ]("hidden")
    : input.nextElementSibling.nextElementSibling.classList[
        `${input.value.trim().length === 0 ? "remove" : "add"}`
      ]("hidden")
}

const claimFreeTrial = function () {
  success = 0
  inputs.forEach((input) => {
    //control the error msg
    if (input.getAttribute("type") === "email")
      input.nextElementSibling.nextElementSibling.textContent = `
      ${
        input.value.trim().length !== 0 && !input.value.match(/^.+@.+\..+$/)
          ? "Looks like this is not an email"
          : "Email cannot be empty"
      }`

    //check if input empty or invalid
    switchOff(input)

    //check how many input is valid
    if (
      input.nextElementSibling.nextElementSibling.classList.contains("hidden")
    )
      success++
  })

  if (success === inputs.length) {
    inputs.forEach((input) => {
      input.value = ""
    })

    modal.closest("body").style.overflow = "hidden"
    modal.classList.remove("hidden")
  }
}

btnClaim.addEventListener("click", claimFreeTrial)

//Close modal
overlay.addEventListener("click", function () {
  this.closest("section").classList.add("hidden")
  this.closest("body").style.overflow = "scroll"
})
