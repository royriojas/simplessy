
# simplessy - Changelog
## v1.0.3
- **Features**
  - use a global animation from within the local by default modules - [9a4c9af]( https://github.com/royriojas/simplessy/commit/9a4c9af ), [royriojas](https://github.com/royriojas), 23/11/2015 16:23:42

    ```less
    // foo.m.less
    .some-selector {
      animation: __global__someAnimation .5s ease-out;
    }
    .foo {
      animation: someAnimation .5s ease-out;
    }
    ```
    
    Will generate:
    
    ```css
    .c_xh233f_some-selector {
      animation: someAnimation .5s ease-out;
    }
    ```
    
## v1.0.2
- **Bug Fixes**
  - allow to pass configuration to this transform - [633f7f0]( https://github.com/royriojas/simplessy/commit/633f7f0 ), [royriojas](https://github.com/royriojas), 12/11/2015 03:44:18

    
## v1.0.1
- **Bug Fixes**
  - missing dependency `ud` - [1660bcd]( https://github.com/royriojas/simplessy/commit/1660bcd ), [royriojas](https://github.com/royriojas), 13/10/2015 01:04:58

    
## v1.0.0
- **Bug Fixes**
  - make css modules be live reloadeable - [bccf212]( https://github.com/royriojas/simplessy/commit/bccf212 ), [royriojas](https://github.com/royriojas), 13/10/2015 00:20:29

    
## v0.1.4
- **Bug Fixes**
  - make classNames predictable so they can be used in watch mode - [2d70382]( https://github.com/royriojas/simplessy/commit/2d70382 ), [royriojas](https://github.com/royriojas), 12/10/2015 23:43:34

    
## v0.1.3
- **Bug Fixes**
  - make sure files are always parsed - [64229a8]( https://github.com/royriojas/simplessy/commit/64229a8 ), [royriojas](https://github.com/royriojas), 12/10/2015 21:40:40

    
## v0.1.2
- **Enhancements**
  - files that ends in `.m.less` are parsed as css modules files that support less - [3846304]( https://github.com/royriojas/simplessy/commit/3846304 ), [royriojas](https://github.com/royriojas), 15/09/2015 20:27:43

    
## v0.1.1
- **Other changes**
  - Add the ability to make class names unique - [53cf47d]( https://github.com/royriojas/simplessy/commit/53cf47d ), [Roy Riojas](https://github.com/Roy Riojas), 31/08/2015 05:19:51

    
## v0.1.0
- **Features**
  - first working version - [ad6dd4d]( https://github.com/royriojas/simplessy/commit/ad6dd4d ), [royriojas](https://github.com/royriojas), 27/08/2015 03:19:00

    
