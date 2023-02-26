let gameForm;
export default gameForm = /*html*/`
    <form id="game_form">
        <div class="row">
            <div class="col-12">
                <h3 class="title-center mb-0">Número sorteado:</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-center align-items-baseline">
                    <span class="fw-bold" id="raffled_number">_</span>
                    <span class="text-muted ms-2 d-none" id="time_counter">
                        (<span id="seconds"></span>s)
                    </span>
                </div>
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-12">
                <div class="d-flex justify-content-center" id="div_game_actions">
                    <button type="button" class="btn btn-secondary" id="btn_restart"><i class="bi bi-arrow-counterclockwise"></i></button>
                </div>
            </div>            
        </div>
    </form>
`;