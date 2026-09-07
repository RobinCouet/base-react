import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./App.css";

function Search() {
    const CLE_API = "rc_live_fc06174ff7634119bd62fa53b7d35848";

    const [pays, setPays] = useState([]);
    const [recherche, setRecherche] = useState("fra");
    const [requete, setRequete] = useState("fra");

    async function chargerPays(terme) {
        if (!terme.trim()) {
            setPays([]);
            return;
        }

        const url = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(terme)}`;

        const reponse = await fetch(url, {
            headers: { Authorization: `Bearer ${CLE_API}` },
        });

        const json = await reponse.json();
        console.log(json);
        setPays(json.data.objects);
    }

    useEffect(() => {
        chargerPays(requete);
    }, [requete]);

    function handleSubmit(e) {
        e.preventDefault();
        setRequete(recherche);
    }

    return (
        <div className="app">
            <h1>Pays</h1>

            <form className="recherche" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    placeholder="Rechercher un pays…"
                />
                <button type="submit">Rechercher</button>
            </form>

            {pays.length === 0 ? (
                <p className="vide">Aucun pays trouvé.</p>
            ) : (
                <ul className="liste-pays">
                    {pays.map((paysItem) => (
                        <li key={paysItem.uuid} className="carte-pays">
                            <img
                                src={paysItem.flag.url_png}
                                alt={`Drapeau de ${paysItem.names.common}`}
                            />
                            <div>
                                <strong>{paysItem.names.common}</strong>
                                <span>
                                    {paysItem.capitals?.[0]?.name ?? "Pas de capitale"}
                                </span>
                            </div>
                            <Link to={`/pays/${paysItem.codes.alpha_3}`}>Voir le détail</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
