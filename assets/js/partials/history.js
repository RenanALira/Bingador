let history;
export default history = /*html*/`
    <div class="accordion mb-2" id="accordion_history">
        <div class="accordion-item">
            <h2 class="accordion-header" id="history">
                <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#heading" aria-expanded="false" aria-controls="heading">
                    Histórico
                </button>
            </h2>
            <div id="heading" class="accordion-collapse collapse" aria-labelledby="history">
                <div class="accordion-body" id="history_body">
                    <div class="d-grid justify-content-start p-2">
                        <input type="text" id="input_search_numbers" class="form-control" placeholder="Busque números">
                    </div>
                    <div id="div_history_items">
                        <!-- Itens de histórico serão adicionados aqui -->
                    </div>
                </div>
            </div>
        </div>
    </div>
`;