export const BoxOrBarBtnBlue = () => {
    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-400 text-xl text-blue-950 font-extrabold p-1.5 px-3 rounded-lg">BOX/BAR</button>
        </>
    );
}
export const BoxOrBarBtnGreen = () => {
    return (
        <>
            <button className="bg-emerald-400 hover:bg-emerald-300 text-xl text-blue-950 font-extrabold p-1.5 px-3 rounded-lg">BOX/BAR</button>
        </>
    );
}

export const SettingsIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9AA1AA"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
    );
}

export const FavoritesIcon = () => {
    return (
        <p className={"text-5xl font-extrabold text-gray-200"}>&#9733;</p>
        /*        <svg className={"fill-yellow-200"} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#D8D8D6"><path d="M306.84-700.82 424-853q11-14 25.59-21 14.58-7 30.5-7 15.91 0 30.41 7t25.5 21l117.16 152.18L831-641q23 8 36 27.11t13 42.22q0 10.67-3.03 21.3-3.04 10.63-9.97 20.37L753-367l4 173q0 31-21 52.5T685.82-120q-1.82 0-18.82-3l-187-52-186.78 51.92Q288-121 282.49-120.5q-5.51.5-10.1.5-29.39 0-49.89-21.69Q202-163.37 203-195l4-173.25L93-531q-6.93-9.83-9.97-20.55Q80-562.28 80-573q0-23 12.92-41.61Q105.84-633.21 129-641l177.84-59.82ZM343-649l-209 70 134 194-5 207 217-60 217 61-5-208 134-192-209-72-137-178-137 178Zm137 147Z"/></svg>*/
    );
}

export const NameEditButton = () => {
    return (
        <svg className={"w-5 right-2 inline-block"} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9AA1AA"><path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"/></svg>
    );
}