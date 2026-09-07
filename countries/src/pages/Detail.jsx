import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Detail() {
    const CLE_API = "rc_live_fc06174ff7634119bd62fa53b7d35848";
    const { code } = useParams();
    const [country, setCountry] = useState();

    const fetchCountry = async () => {
        const url = `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}`;

        const reponse = await fetch(url, {
            headers: { Authorization: `Bearer ${CLE_API}` },
        });

        const json = await reponse.json();
        console.log(json);
        setCountry(json.data.objects[0]);
    }

    useEffect(() => {
        fetchCountry();
    }, []);

    if (!country) {
        return (
            <>Chargement....</>
        )
    }

    return (
        <>
            <img
                src={country.flag.url_png}
                alt={`Drapeau de ${country.names.common}`}
            />
            <h1>{country.names.common} {country.flag?.emoji}</h1>
            <p><em>{country.names.official}</em></p>

            <ul>
                <li>
                    <strong>Capitale :</strong>{" "}
                    {country.capitals?.[0]?.name ?? "Pas de capitale"}
                </li>
                <li>
                    <strong>Région :</strong>{" "}
                    {country.region}
                    {country.subregion ? ` — ${country.subregion}` : ""}
                </li>
                <li>
                    <strong>Population :</strong>{" "}
                    {country.population?.toLocaleString("fr-FR") ?? "Inconnue"}
                </li>
                <li>
                    <strong>Superficie :</strong>{" "}
                    {country.area?.kilometers
                        ? `${country.area.kilometers.toLocaleString("fr-FR")} km²`
                        : "Inconnue"}
                </li>
                <li>
                    <strong>Langues :</strong>{" "}
                    {country.languages?.map((l) => l.name).join(", ") || "Aucune"}
                </li>
                <li>
                    <strong>Devises :</strong>{" "}
                    {country.currencies
                        ?.map((c) => `${c.name} (${c.symbol ?? c.code})`)
                        .join(", ") || "Aucune"}
                </li>
                <li>
                    <strong>Code :</strong>{" "}
                    {country.codes?.alpha_2} / {country.codes?.alpha_3}
                </li>
                <li>
                    <strong>Continents :</strong>{" "}
                    {country.continents?.join(", ") || "Aucun"}
                </li>
                <li>
                    <strong>Fuseaux horaires :</strong>{" "}
                    {country.timezones?.join(", ") || "Aucun"}
                </li>
                <li>
                    <strong>Frontières :</strong>{" "}
                    {country.borders?.join(", ") || "Aucune (île ou enclavé)"}
                </li>
            </ul>
        </>
    )
}

export default Detail;