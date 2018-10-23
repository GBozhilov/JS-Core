function getConeVolumeAndArea(r, h) {
    // Calculate slant height
    let s = Math.sqrt(r * r + h * h);
    // Calculate volume and area
    let volume = Math.PI * r * r * h / 3;
    let area = Math.PI * r * (r + s);

    console.log('volume = ' + volume);
    console.log('area = ' + area);
}

getConeVolumeAndArea(3, 5);