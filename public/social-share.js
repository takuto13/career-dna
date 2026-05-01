(() => {
  const shareLinks = document.querySelectorAll(".js-share-link");
  if (!shareLinks.length) return;

  const shareUrl = window.location.href;
  const shareTitle = document.title || "CareerDNA";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const openWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer,width=640,height=720");
  };

  const notifyCopied = () => {
    window.alert("ページURLをコピーしました。Instagramで貼り付けて共有してください。");
  };

  const copyLink = async () => {
    if (!navigator.clipboard || !window.isSecureContext) return false;
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch (_) {
      return false;
    }
  };

  shareLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const platform = link.dataset.sharePlatform;

      if (platform === "x") {
        openWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`);
        return;
      }

      if (platform === "facebook") {
        openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
        return;
      }

      if (platform === "note") {
        openWindow(`https://note.com/intent/post?url=${encodedUrl}&title=${encodedTitle}`);
        return;
      }

      if (platform === "instagram") {
        if (navigator.share) {
          try {
            await navigator.share({ title: shareTitle, url: shareUrl });
          } catch (_) {
            // User canceled; no action needed.
          }
          return;
        }

        const copied = await copyLink();
        if (copied) {
          notifyCopied();
        }
        openWindow("https://www.instagram.com/");
      }
    });
  });
})();
