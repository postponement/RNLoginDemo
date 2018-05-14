
//
//  YCCustomVC.m
//  RNTest
//
//  Created by liuyanchi on 2018/5/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "YCCustomVC.h"

@interface YCCustomVC ()

@end

@implementation YCCustomVC

- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor orangeColor];
  
  UIButton *btn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 150, 50)];
  btn.center = self.view.center;
  [btn setTitle:_buttonName forState:0];
  [btn addTarget:self action:@selector(buttonClock) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:btn];
  
}

- (void)buttonClock
{
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
  
}

@end
