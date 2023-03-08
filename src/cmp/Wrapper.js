
function Wrapper({ children, ...props }) {
    return (
        <div style={{ display: "grid", minHeight: "85vh", placeItems: props.self }}>{children}
        </div>
    );
}

export default Wrapper;