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
                    cache.keys()
                        .then(keys => {
                            console.log(keys);
                            if (keys.length > 0) {
                                keys.forEach(key => {
                                    let url = getPathName(key.url)
                                    html += `<a href="${url}">${url}</a>`
                                })
                                html += '<a class="deleteBookmarks" deleteBookmarks>Verwijder alle opgeslagen items</a>'
                            }
                            else {
                                html = "<h3>Helaas...</h3><p>Je hebt nog geen opgeslagen items</p>"
                            }
                            bookmarks.insertAdjacentHTML('afterBegin', html)
                        })
                        .then( _ => {
                            const deleteBookmark = document.querySelector('.deleteBookmarks')
                            if (deleteBookmark) {
                                deleteBookmark.addEventListener('click', deleteBookmarks)
                            }
                        })
                })
        }
    }   
}

export async function deleteBookmarks() {
    if ('serviceWorker' in navigator) {
        const bookmarks = document.querySelector('.bookmarks');
        if (bookmarks != undefined) {
            caches.delete('bookmarks')
                .then(
                    location.reload()
                )
                .catch(error => {
                    console.log(error)
                })
        }
    }
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}



