Module('LK.wave', function () {
    var SEPARATION = 125,
        AMOUNTX = 35,
        AMOUNTY = 35,
        container,
        camera,
        scene,
        renderer,
        particles,
        particle,
        count = 0,
        particles_globe = [],
        mouseX = 0,
        mouseY = 0,
        objTo,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,
        animation_type, rotation_speed = .002,
        timeout = null,
        $viewPort = $(document),
        $_body = $("body"),
        $_html = $("html");

    function webglWave(e, t) {
        return $_body.hasClass("ismobile") || $_html.hasClass("ie9") ? !1 : void("init" == e ? "page404" == t ? (initGlobeError(t), addRemoveListeners(!0), animateGlobeError()) : (animation_type = Math.floor(2 * Math.random() + 0), 0 == animation_type ? (initWave(t), addRemoveListeners(!0), animateWave()) : 1 == animation_type && (initGlobe(t), addRemoveListeners(!0), animateGlobe())) : "kill" == e ? "page404" == t ? (stopAnimationGlobeError(animation_id), killAnimationGlobeError(), addRemoveListeners(!1)) : 0 == animation_type ? (stopAnimationWave(animation_id), killAnimationWave(), addRemoveListeners(!1)) : 1 == animation_type && (stopAnimationGlobe(animation_id), killAnimationGlobe(), addRemoveListeners(!1)) : "play" == e ? "page404" == t ? (addRemoveListeners(!0), animateGlobeError()) : 0 == animation_type ? (addRemoveListeners(!0), animateWave()) : 1 == animation_type && (addRemoveListeners(!0), animateGlobe()) : "stop" == e && ("page404" == t ? (addRemoveListeners(!1), stopAnimationGlobeError(animation_id)) : 0 == animation_type ? (addRemoveListeners(!1), stopAnimationWave(animation_id)) : 1 == animation_type && (addRemoveListeners(!1), stopAnimationGlobe(animation_id))))
    }

    function initWave(e) {
        objTo = document.getElementById(e), container = document.getElementById("welcomeAnimate"), objTo.appendChild(container), camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 1,
            1e4), camera.position.z = 1e3, camera.position.y = 100, camera.position.y = 1e3, scene = new THREE.Scene, particles = new Array;
        for (var t = 2 * Math.PI, i = 0, n = 0; AMOUNTX > n; n++)for (var o = 0; AMOUNTY > o; o++) {
            var s = new THREE.SpriteCanvasMaterial({
                color: 16777215, transparent: !0, program: function (e) {
                    e.beginPath(), e.arc(0, 0, .5, 0, t, !0), e.fill()
                }
            });
            particle = particles[i++] = new THREE.Sprite(s), particle.position.x = n * SEPARATION - AMOUNTX * SEPARATION / 2, particle.position.z = o * SEPARATION - AMOUNTY * SEPARATION / 2, scene.add(particle), particle.material.opacity = .4
        }
        renderer = new THREE.CanvasRenderer({alpha: !0}),
            renderer.setClearColor(0, 0), renderer.setSize(window.innerWidth, window.innerHeight),
            container.appendChild(renderer.domElement);

    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix(), renderer.setSize(window.innerWidth,
            window.innerHeight)
    }

    function animateWave() {
        animation_id = requestAnimationFrame(animateWave), renderWave()
    }

    function renderWave() {
        camera.position.x += .01 * (mouseX - camera.position.x), camera.position.y += .005 * (mouseY - camera.position.y), camera.lookAt(scene.position);
        for (var e = 0, t = 0; AMOUNTX > t; t++)for (var i = 0; AMOUNTY > i; i++)particle = particles[e++], particle.position.y = 50 * Math.sin(.3 * (t + count)) + 50 * Math.sin(.5 * (i + count)), particle.scale.x = particle.scale.y = 4 * (Math.sin(.3 * (t + count)) + 1) + 4 * (Math.sin(.5 * (i + count)) + 1), opacity = Math.abs(particle.position.y) / 100, .5 > opacity && (opacity = .5), opacity > 1 && (opacity = 1), particle.material.opacity = opacity;
        renderer.render(scene, camera), count += .03
    }

    function killAnimationWave() {
        if (scene)for (; scene.children.length > 0;)scene.remove(scene.children[scene.children.length - 1]);
        $("#welcomeAnimate > canvas").remove()
    }

    function stopAnimationWave(e) {
        cancelAnimationFrame(e)
    }

    function initGlobe(e) {
        objTo = document.getElementById(e), container = document.getElementById("welcomeAnimate"), objTo.appendChild(container), camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 1, 1e4), camera.position.z = 500, scene = new THREE.Scene;
        for (var t = 2 * Math.PI, i = function (e) {
            e.beginPath(), e.arc(0, 0, 25, 0, t, !0), e.fill()
        }, t = 2 * Math.PI, n = 0; 500 > n; n++) {
            var o = new THREE.SpriteCanvasMaterial({
                color: 16777215, transparent: !0, program: function (e) {
                    e.beginPath(), e.arc(0, 0, .5, 0, t, !0), e.fill()
                }
            });
            particle = new THREE.Sprite(o), particle.position.x = 2 * Math.random() - 1, particle.position.y = 2 * Math.random() - 1, particle.position.z = 2 * Math.random() - 1, particle.position.normalize(), particle.position.multiplyScalar(10 * Math.random() + 450), particle.scale.multiplyScalar(4 + 2 * Math.random()), particle.material.opacity = .1, scene.add(particle), particles_globe.push(particle)
        }
        for (var n = 0; 500 > n; n++) {
            var s = new THREE.Geometry, r = new THREE.Vector3(2 * Math.random() - 1, 2 * Math.random() - 1,
                2 * Math.random() - 1);
            r.normalize(), r.multiplyScalar(450), s.vertices.push(r);
            var a = r.clone();
            a.multiplyScalar(.3 * Math.random() + 1), s.vertices.push(a);
            var l = new THREE.Line(s, new THREE.LineBasicMaterial({color: 16777215, opacity: .3}));
            scene.add(l)
        }
        renderer = new THREE.CanvasRenderer({alpha: !0}), renderer.setClearColor(0, 0), renderer.setSize(window.innerWidth,
            window.innerHeight), container.appendChild(renderer.domElement)
    }

    function animateGlobe() {
        animation_id = requestAnimationFrame(animateGlobe), renderGlobe()
    }

    function renderGlobe() {
        var e = $("body:hover"), t = camera.position.x, i = camera.position.y, n = camera.position.z;
        0 != e.length && null != timeout ? camera.position.x += .05 * (mouseX - camera.position.x) : (camera.position.x = t * Math.cos(rotation_speed) - n * Math.sin(rotation_speed), camera.position.z = n * Math.cos(rotation_speed) + t * Math.sin(rotation_speed)), camera.position.y += .05 * (-mouseY + 200 - camera.position.y), $viewPort.on("mousemove",
            function () {
                null !== timeout && clearTimeout(timeout), timeout = setTimeout(function () {
                    timeout = null
                }, 600)
            }), camera.lookAt(scene.position);
        for (var o = 0, o = 0; o < particles_globe.length; o++)particle = particles_globe[o++], temp = 50 * Math.sin(.3 * (o + count)) + .5 * Math.sin(.5 * (o + count)), opacity = Math.abs(temp) / 50 + .1, opacity > 1 && (opacity = 1), particle.material.opacity = opacity;
        renderer.render(scene, camera), count += .1, renderer.render(scene, camera)
    }

    function killAnimationGlobe() {
        if (scene)for (; scene.children.length > 0;)scene.remove(scene.children[scene.children.length - 1]);
        $("#welcomeAnimate > canvas").remove()
    }

    function stopAnimationGlobe(e) {
        cancelAnimationFrame(e)
    }

    function initGlobeError(e) {
        objTo = document.getElementById(e), container = document.getElementById("welcomeAnimate"), objTo.appendChild(container), camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 1, 1e4), camera.position.z = 500, scene = new THREE.Scene;
        for (var t = 2 * Math.PI, i = function (e) {
            e.beginPath(), e.arc(0, 0, 25, 0, t, !0), e.fill()
        }, t = 2 * Math.PI, n = 0; 250 > n; n++) {
            var o = new THREE.SpriteCanvasMaterial({
                color: 16777215, transparent: !0, program: function (e) {
                    e.beginPath(), e.arc(0, 0, .5, 0, t, !0), e.fill()
                }
            });
            particle = new THREE.Sprite(o), particle.position.x = 2 * Math.random() - 1, particle.position.y = 2 * Math.random() - 1, particle.position.z = 2 * Math.random() - 1, particle.position.normalize(), particle.position.multiplyScalar(10 * Math.random() + 450), particle.scale.multiplyScalar(4 + 2 * Math.random()), particle.material.opacity = .1, scene.add(particle), particles_globe.push(particle)
        }
        renderer = new THREE.CanvasRenderer({alpha: !0}), renderer.setClearColor(0, 0), renderer.setSize(window.innerWidth,
            window.innerHeight), container.appendChild(renderer.domElement)
    }

    function animateGlobeError() {
        animation_id = requestAnimationFrame(animateGlobeError), renderGlobeError()
    }

    function renderGlobeError() {
        var e = .002, t = camera.position.x, i = camera.position.y, n = camera.position.z;
        camera.position.x = t * Math.cos(e) + n * Math.sin(e), camera.position.z = n * Math.cos(e) - t * Math.sin(e), camera.lookAt(scene.position), renderer.render(scene,
            camera), count += .1, renderer.render(scene, camera)
    }

    function killAnimationGlobeError() {
        if (scene)for (; scene.children.length > 0;)scene.remove(scene.children[scene.children.length - 1]);
        $("#welcomeAnimate > canvas").remove()
    }

    function stopAnimationGlobeError(e) {
        cancelAnimationFrame(e)
    }

    function addRemoveListeners(e) {
        e ? (document.addEventListener("mousemove", onDocumentMouseMove, !1), document.addEventListener("touchstart",
            onDocumentTouchStart, !1), document.addEventListener("touchmove", onDocumentTouchMove,
            !1), window.addEventListener("resize", onWindowResize, !1)) : (document.removeEventListener("mousemove",
            onDocumentMouseMove, !1), document.removeEventListener("touchstart", onDocumentTouchStart,
            !1), document.removeEventListener("touchmove", onDocumentTouchMove, !1), window.removeEventListener("resize",
            onWindowResize, !1))
    }

    function onDocumentMouseMove(e) {
        mouseX = e.clientX - windowHalfX, mouseY = e.clientY + 150
    }

    function onDocumentTouchStart(e) {
        1 === e.touches.length && (e.preventDefault(), mouseX = e.touches[0].pageX - windowHalfX, mouseY = -e.touches[0].pageY)
    }

    function onDocumentTouchMove(e) {
        1 === e.touches.length && (e.preventDefault(), mouseX = e.touches[0].pageX - windowHalfX, mouseY = -e.touches[0].pageY)
    }

    return {
        init: function () {
            $(function () {
                webglWave("init", "welcome");
            });
        }
    };
});
