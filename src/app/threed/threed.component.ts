import { RendererService } from '../renderer.service';
import * as THREE from 'three';
import {Component,OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-threed',
  templateUrl: './threed.component.html',
  styleUrls: ['./threed.component.css']
})
export class ThreedComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  private renderer = new THREE.WebGLRenderer();
  private scene = null;
  private camera = null;
  private mesh = null;


  constructor(
  //  private renderer: RendererService,
  ){
  this.scene = new THREE.Scene();
   this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
           this.camera.position.z = 1000;

           const geometry = new THREE.BoxGeometry(200, 200, 200);
           const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
           this.mesh = new THREE.Mesh(geometry, material);

           this.scene.add(this.mesh);
   }

   ngAfterViewInit() {
       this.renderer.setSize(window.innerWidth, window.innerHeight);
       this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
       this.animate();
   }

   animate() {
       window.requestAnimationFrame(() => this.animate());
       this.mesh.rotation.x += 0.01;
       this.mesh.rotation.y += 0.02;
       this.renderer.render(this.scene, this.camera);
   }


    ngOnInit() {
      console.log("Init on threed component.");
    }

}
