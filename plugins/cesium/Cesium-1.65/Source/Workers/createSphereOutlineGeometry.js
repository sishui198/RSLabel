/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-76089d4c', './Check-5cd4f88e', './Math-4da9b357', './Cartesian2-88a9081c', './defineProperties-7057a760', './Transforms-30697ad4', './RuntimeError-bd79d86c', './WebGLConstants-e4e9c6cc', './ComponentDatatype-7dd74ff6', './GeometryAttribute-46ce3b25', './GeometryAttributes-36724c9f', './IndexDatatype-7c4ae249', './GeometryOffsetAttribute-b8954087', './EllipsoidOutlineGeometry-281d484f'], function (when, Check, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, EllipsoidOutlineGeometry) { 'use strict';

    /**
         * A description of the outline of a sphere.
         *
         * @alias SphereOutlineGeometry
         * @constructor
         *
         * @param {Object} [options] Object with the following properties:
         * @param {Number} [options.radius=1.0] The radius of the sphere.
         * @param {Number} [options.stackPartitions=10] The count of stacks for the sphere (1 greater than the number of parallel lines).
         * @param {Number} [options.slicePartitions=8] The count of slices for the sphere (Equal to the number of radial lines).
         * @param {Number} [options.subdivisions=200] The number of points per line, determining the granularity of the curvature .
         *
         * @exception {DeveloperError} options.stackPartitions must be greater than or equal to one.
         * @exception {DeveloperError} options.slicePartitions must be greater than or equal to zero.
         * @exception {DeveloperError} options.subdivisions must be greater than or equal to zero.
         *
         * @example
         * var sphere = new Cesium.SphereOutlineGeometry({
         *   radius : 100.0,
         *   stackPartitions : 6,
         *   slicePartitions: 5
         * });
         * var geometry = Cesium.SphereOutlineGeometry.createGeometry(sphere);
         */
        function SphereOutlineGeometry(options) {
            var radius = when.defaultValue(options.radius, 1.0);
            var radii = new Cartesian2.Cartesian3(radius, radius, radius);
            var ellipsoidOptions = {
                    radii: radii,
                    stackPartitions: options.stackPartitions,
                    slicePartitions: options.slicePartitions,
                    subdivisions: options.subdivisions
            };

            this._ellipsoidGeometry = new EllipsoidOutlineGeometry.EllipsoidOutlineGeometry(ellipsoidOptions);
            this._workerName = 'createSphereOutlineGeometry';
        }

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        SphereOutlineGeometry.packedLength = EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.packedLength;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {SphereOutlineGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        SphereOutlineGeometry.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            //>>includeEnd('debug');

            return EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.pack(value._ellipsoidGeometry, array, startingIndex);
        };

        var scratchEllipsoidGeometry = new EllipsoidOutlineGeometry.EllipsoidOutlineGeometry();
        var scratchOptions = {
            radius : undefined,
            radii : new Cartesian2.Cartesian3(),
            stackPartitions : undefined,
            slicePartitions : undefined,
            subdivisions : undefined
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {SphereOutlineGeometry} [result] The object into which to store the result.
         * @returns {SphereOutlineGeometry} The modified result parameter or a new SphereOutlineGeometry instance if one was not provided.
         */
        SphereOutlineGeometry.unpack = function(array, startingIndex, result) {
            var ellipsoidGeometry = EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.unpack(array, startingIndex, scratchEllipsoidGeometry);
            scratchOptions.stackPartitions = ellipsoidGeometry._stackPartitions;
            scratchOptions.slicePartitions = ellipsoidGeometry._slicePartitions;
            scratchOptions.subdivisions = ellipsoidGeometry._subdivisions;

            if (!when.defined(result)) {
                scratchOptions.radius = ellipsoidGeometry._radii.x;
                return new SphereOutlineGeometry(scratchOptions);
            }

            Cartesian2.Cartesian3.clone(ellipsoidGeometry._radii, scratchOptions.radii);
            result._ellipsoidGeometry = new EllipsoidOutlineGeometry.EllipsoidOutlineGeometry(scratchOptions);
            return result;
        };

        /**
         * Computes the geometric representation of an outline of a sphere, including its vertices, indices, and a bounding sphere.
         *
         * @param {SphereOutlineGeometry} sphereGeometry A description of the sphere outline.
         * @returns {Geometry} The computed vertices and indices.
         */
        SphereOutlineGeometry.createGeometry = function(sphereGeometry) {
            return EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.createGeometry(sphereGeometry._ellipsoidGeometry);
        };

    function createSphereOutlineGeometry(sphereGeometry, offset) {
            if (when.defined(offset)) {
                sphereGeometry = SphereOutlineGeometry.unpack(sphereGeometry, offset);
            }
            return SphereOutlineGeometry.createGeometry(sphereGeometry);
        }

    return createSphereOutlineGeometry;

});
