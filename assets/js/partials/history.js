let history;
export default history = /*html*/`
    <div class="accordion mb-2" id="accordion_history">
        <div class="accordion-item">
            <h2 class="accordion-header" id="history">
                <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#heading" aria-expanded="false" aria-controls="heading">
                    Histórico
                </button>
            </h2>
            <div id="heading" class="accordion-collapse collapse" aria-labelledby="history" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body" id="history_body">
                    <table class="table table-striped">
                        <thead>
                            <th scope="col">Ordem</th>
                            <th scope="col">Nº sorteado</th>
                        </thead>
                        <tbody id="history_table"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`;