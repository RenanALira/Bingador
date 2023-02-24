let configForm;
export default configForm = /*html*/`
    <form id="config_form">
        <h3 class="title-center">Configurações</h3>
        <div class="row mb-2">
            <div class="col-md-6">
                <label for="input_from" class="form-label">Sortear de:</label>
                <input type="number" class="form-control" id="input_from" value="0" required>
            </div>
            <div class="col-md-6">
                <label for="input_to" class="form-label">Até:</label>
                <input type="number" class="form-control" id="input_to" value="99">
            </div>
        </div>

        <div class="row mb-2">
            <div class="col-md-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="switch_auto_raffle">
                    <label class="form-check-label" for="switch_auto_raffle">Sortear automaticamente</label>
                </div>
            </div>
            <div class="col-md-6 d-none" id="seconds_to_raffle">
                <label for="input_seconds" class="form-label">A cada:</label>
                <div class="input-group mb-3">
                    <input type="number" class="form-control" id="input_seconds" value="0">
                    <span class="input-group-text" id="basic-addon3">segundos</span>
                </div>
            </div>
        </div>

        <button class="btn btn-primary fw-bold w-100" type="submit">
            BINGAR!
        </button>
    </form>
`;