import GitLogo from "../assets/github-logo.png";

function cargarImagenes(){
    const logoGithub = document.querySelector("#logo-github");
    logoGithub.src = GitLogo;
}

export {cargarImagenes};