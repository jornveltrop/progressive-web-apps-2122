async function handleBookmark(url, cache, bookmarkElement) {
    const isBookmarked = await cache.match(url)

    if (!isBookmarked) {
        bookmarkElement.src = "/images/bookmark_active.svg"
        fetch(url)
            .then(response => cache.put(url, response))
            .catch(() => {
                bookmarkElement.src = "/images/bookmark.svg"
                console.log('Bookmark error')
            })
    } else {
        const isRemoved = await cache.delete(url)
        if (isRemoved) {
            bookmarkElement.src = "/images/bookmark.svg"
        } else (
            console.log('Bookmark error')
        )
    }
}

export async function initBookmark() {
    const bookmarks = document.querySelectorAll('[bookmark]');

    if ('serviceWorker' in navigator) {
        const cache = await caches.open('bookmarks')

        bookmarks.forEach(async bookmark => {
            const url = 'detail/' + bookmark.getAttribute('bookmarkID')

            bookmark.addEventListener('click', function(e) {
                console.log(url);
                handleBookmark(url, cache, bookmark)
            })

            const isBookmarked = await cache.match(url)
            if (isBookmarked) {
                bookmark.src = "/images/bookmark_active.svg"
            }
            else {
                bookmark.src = "/images/bookmark.svg"
            }
        })
    }
}

export async function placeBookmarks() {
    if ('serviceWorker' in navigator) {
        const bookmarks = document.querySelector('.bookmarks');
        if (bookmarks != undefined) {
            let html = ''

            caches.open('bookmarks')
                .then(function(cache) {
                    // console.log(cache)
                    cache.keys()
                        .then(keys => {
                            // console.log(keys)
                            keys.forEach(key => {
                                let url = getPathName(key.url)
                                html += `<a href="${url}">${url}</a>`
                            })
                            bookmarks.insertAdjacentHTML('afterBegin', html)
                        });
                })
        }
    }   
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}



