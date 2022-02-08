addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});
async function handleRequest(request) {
    let url = new URL(request.url);
    const { pathname } = new URL(request.url);
    const user = url.searchParams.get("user");
    const project = url.searchParams.get("project");
    const fileid = url.searchParams.get("fileid");
    if (user && project && fileid) {
        const link = await fileToLink(user, project, fileid);
        if (link) {
            if (pathname.startsWith("/directlink")) {
                return Response.redirect(link, 302)
            }
            if (pathname.startsWith("/proxylink")) {

                return fetch(link)
            }
            if (pathname.startsWith("/getlink")) {
                return new Response(link, { status: 200 })
            }
            return new Response('不支持的URL请求', { status: 404 })
        } else {
            return new Response('解析失败', { status: 404 })
        }
    } else {
        return new Response('参数不完整', { status: 404 })
    }
}

async function fileToLink(user, project, fileid) {
    let jsonFetch = await fetch("https://" + user + ".itch.io/" + project + "/file/" + fileid + "?source=view_game&as_props=1&after_download_lightbox=true", {
        "headers": {
            "origin": "https://" + user + ".itch.io",
            "referrer": "https://" + user + ".itch.io/" + project,
            "x-requested-with": "XMLHttpRequest"
        },
        "method": "POST"
    })
    try {
        let jsonObj = await jsonFetch.json();
        if (jsonObj.url) {
            return jsonObj.url;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
