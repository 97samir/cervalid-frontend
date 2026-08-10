const InstitutionListCard = ({ institutions, onEnter }) => {
    return (
        <div className="card p-4">
        <h5>Instituciones</h5>

        <ul className="list-group mt-3">
            {institutions.map((inst) => (
            <li
                key={inst.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                {inst.name}

                <button
                className="btn btn-primary btn-sm"
                onClick={() => onEnter(inst)}
                >
                Entrar
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default InstitutionListCard;