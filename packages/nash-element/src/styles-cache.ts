/**
 * Creates and caches <style> elements pre-filled with stylesheets it has
 * seen before. Because Nash allows elements to easily inherit and share
 * stylesheets this prevents creating a <style> element from scratch every
 * time. We can create one and then just return a clone of it the next time
 * it is needed.
 */
export class StylesCache {
  public cache: { [key: string]: HTMLStyleElement } = {};

  public get(module) {
    if (!this.cache[module.toString()]) {
      this.set(module);
    }

    return this.cache[module.toString()].cloneNode(true);
  }

  public set(module) {
    const style = document.createElement('style');
    style.innerHTML = module.toString();
    this.cache[module.toString()] = style;
  }
}
