import {
    _decorator,
    Camera,
    Color,
    Component,
    geometry,
    GeometryRenderer,
    Mat4,
    Mesh,
    MeshRenderer,
    ModelComponent,
    Node,
    primitives,
    renderer,
    utils,
    Vec3,
    Vec4,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CustomMesh")
export class CustomMesh extends Component {
    @property(Camera)
    cameraComp: Camera = null;

    private camera: renderer.scene.Camera = null!;
    private _wireframe = false;
    private _depthTest = false;
    private _unlit = false;
    start() {
        this.camera = this.cameraComp.camera;
        this.camera.initGeometryRenderer();
    }

    protected update(dt: number): void {
        this.createMesh();
    }

    createMesh() {
        let renderer = this.camera.geometryRenderer;
        if (!renderer) return;
        const useTransform = true;
        let knots: Vec3[] = [];
        let pos: Vec3 = Vec3.ZERO;
        knots.push(new Vec3(pos.x - 3, pos.y, pos.z));
        knots.push(new Vec3(pos.x, pos.y + 3, pos.z));
        knots.push(new Vec3(pos.x + 3, pos.y, pos.z));
        knots.push(new Vec3(pos.x + 6, pos.y + 3, pos.z));
        knots.push(new Vec3(pos.x + 9, pos.y, pos.z));
        knots.push(new Vec3(pos.x + 12, pos.y + 3, pos.z));

        if (knots.length < 2) return;
        for (let i = 0; i < knots.length - 1; i++) {
            let j = i + 1;
            let p1 = knots[i];
            let p2 = knots[j];
            renderer.addLine(p1, p2, Color.WHITE, false);
        }

        let transform = this.rotate(Math.PI / 4, pos);
        renderer.addCylinder(
            pos,
            0.2,
            4.0,
            Color.WHITE,
            32,
            this._wireframe,
            this._depthTest,
            this._unlit,
            useTransform,
            transform
        );
    }

    private rotate(angle: number, pos: Vec3): Mat4 {
        let result = new Mat4();
        let transform = new Mat4();

        Mat4.fromTranslation(result, pos);
        Mat4.fromXRotation(transform, Math.PI / 2);
        Mat4.rotateY(transform, new Mat4(), Math.PI / 2 + Math.PI / 4);
        // Mat4.fromXRotation(transform, Math.PI / 2);
        result.multiply(transform);
        Mat4.fromTranslation(transform, new Vec3(-pos.x, -pos.y, -pos.z));
        result.multiply(transform);

        return result;
    }

    createLine() {
        const point1 = new Vec3(0, 0, 0);
        const point2 = new Vec3(1, 0, 0);
        const point3 = new Vec3(0, 1, 0);
    }

    createCubeMesh() {
        let point = [
            //bottom
            0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1,
            //top
            0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1,
            //left
            0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1,
            //right
            1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
            //back
            0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0,
            //front
            0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
        ];
        let mesh = utils.MeshUtils.createMesh({
            positions: point,
        });
        return mesh;
    }

    createMesh2() {
        let point = [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1];
        let uvs = [0, 0, 0, 1, 1, 0, 1, 1];
        let normals = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
        let indices = [0, 1, 2, 2, 1, 3];
        let mesh = utils.MeshUtils.createMesh({
            positions: point,
            uvs: uvs,
            normals: normals,
            indices: indices,
        });
        return mesh;
    }

    createCustomMesh() {
        let point = [
            0,
            0,
            0, //point 1  x,y,z
            0,
            0,
            1, //point 2  x,y,z
            1,
            0,
            0, //point 3  x,y,z
            1,
            0,
            0, //point 3  x,y,z
            0,
            0,
            1, //point 2  x,y,z
            1,
            0,
            1,
        ];
        let uvs = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
        let normals = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
        let mesh = utils.MeshUtils.createMesh({
            positions: point,
            uvs: uvs,
            normals: normals,
        });
        return mesh;
    }
}
