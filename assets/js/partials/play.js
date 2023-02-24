let gameForm;
export default gameForm = /*html*/`
    <form id="game_form">
        <h3 class="title-center mb-0">Número sorteado:</h3>
        <div class="d-flex justify-content-center align-items-baseline mb-2">
            <span class="fw-bold me-2" id="raffled_number">_</span>
            <span class="text-muted d-none" id="time_counter">
                (<span id="seconds"></span>s)
            </span>
        </div>

        <button type="button" class="btn btn-primary fw-bold w-100" id="btn_start"></button>
    </form>
`;