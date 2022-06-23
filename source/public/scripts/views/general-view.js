export default class GeneralListView {

  constructor(){
    this.bodyHTML = document.querySelector("body");
  }

  showGeneralView() {
    const generalView = `
                        <header class="header">
                            <img src="./assets/logo-ost.svg" class="logo"></img>
                            <button class="style-btn">Toogle Style</button>
                        </header>
                        <main id="todo-app-container">
                        </main>
                        <footer>
                            <p>Author: Umut Güngör<br>
                                <a href="umut.guengoer@ost.ch">umut.guengoer@ost.ch</a>
                            </p>
                        </footer>
            `;
    
    return generalView;
  }

  renderGeneralView () {
    this.bodyHTML.innerHTML = this.showGeneralView();
    this.todoContainer = document.querySelector("#todo-app-container");
    this.toogleStyleBtn = document.querySelector(".style-btn");
  }
}
