export default function Book(props) {
    return (
        <ul style={{ display: 'flex', borderBottom: "1px dashed black" }}>
            <li key={props.index} style={{ width: "80%", marginLeft: "8%", listStyle: "none" }}>
                <div style={{ display: "grid" }}>
                    <img
                        alt={props.alt}
                        src={props.src}
                        style={{ placeSelf: "center" }} />
                    <div>
                        <h3 style={{ fontSize: "medium", marginTop: "10px" }}>{props.title}</h3>
                        <p>{props.author}</p>
                        <p>{props.publishDate}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}