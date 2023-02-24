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

        <button class="btn btn-primary fw-bold w-100" type="submit">
            BINGAR!
        </button>
    </form>
`;